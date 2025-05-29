/*!
 * md_loader.js - Resilient Markdown Loader Script
 * Version: 1.2.0 Last Updated: 2025-05-29
 * Author: James Even Chen https://evenc.org/
 * Description: Dynamically loads and renders Markdown files into <zero-md> elements.
 * - Supports: Remote URLs, Absolute paths, Relative files
 * - Includes: Retry logic, jitter delay, and custom 404 redirect
 * 1.1.0 Notes:
 * - Retries loading if Markdown content doesn't render.
 * - Displays fallback message after max retries.
 */

document.addEventListener('DOMContentLoaded', function () {
    const searchParams = new URLSearchParams(window.location.search);
    let md_file = searchParams.get('p');

    if (!md_file) {
        console.warn("No markdown file specified in the URL (e.g. ?p=page1).");
        return;
    }

    // Normalize file path
    const isFullURL = md_file.startsWith('http://') || md_file.startsWith('https://');
    const isAbsolutePath = md_file.startsWith('/');
    if (!md_file.endsWith('.md')) {
        md_file += '.md';
    }

    if (isFullURL) {
        // Skip checking, just load
        applyJitterThenLoad(md_file);
    } else {
        // Check if local/absolute file exists first
        const filePath = isAbsolutePath ? md_file : './' + md_file;

        fetch(filePath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    applyJitterThenLoad(filePath);
                } else {
                    console.warn(`Markdown file not found: ${filePath}`);
                    window.location.href = '/404';
                }
            })
            .catch(error => {
                console.error("Error checking markdown file:", error);
                window.location.href = '/404';
            });
    }

    // Slight random delay to avoid burst loads when many tabs are opened
    function applyJitterThenLoad(file) {
        const jitterDelay = Math.floor(Math.random() * 300); // 0–300ms
        setTimeout(() => {
            loadMarkdown(file);
        }, jitterDelay);
    }

    function loadMarkdown(file, retryCount = 0) {
        const MAX_RETRIES = 3;
        const BASE_DELAY = 2000; // 2 seconds
        const RETRY_DELAY = BASE_DELAY * Math.pow(2, retryCount); // exponential

        const zeroMdElement = document.querySelector('zero-md');
        if (!zeroMdElement) {
            console.error("zero-md element not found.");
            return;
        }

        zeroMdElement.setAttribute('src', file);
        let rendered = false;

        const renderHandler = () => {
            rendered = true;
            updateTitle(zeroMdElement);
        };

        zeroMdElement.addEventListener('zero-md-rendered', renderHandler, { once: true });

        setTimeout(() => {
            if (!rendered) {
                console.warn(`Retry ${retryCount + 1}/${MAX_RETRIES} for: ${file}`);
                zeroMdElement.removeEventListener('zero-md-rendered', renderHandler);

                if (retryCount < MAX_RETRIES) {
                    loadMarkdown(file, retryCount + 1);
                } else {
                    console.error("Failed to load markdown content after multiple attempts.");
                    alert("Failed to load content. Please refresh the page or try again later.");

                    const fallback = document.getElementById('md-fallback');
                    if (fallback) fallback.style.display = 'block';
                }
            }
        }, RETRY_DELAY);
    }

    function updateTitle(zeroMdElement) {
        const h1Element = zeroMdElement.shadowRoot?.querySelector('h1');
        const title = h1Element ? h1Element.textContent : 'Untitled';
        document.title = `${title} - James Even Chen`;
    }
});
