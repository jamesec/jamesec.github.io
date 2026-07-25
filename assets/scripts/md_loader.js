/*!
 * md_loader.js - Resilient Markdown Loader Script
 * Version: 2.1 Last Updated: 2025-07-05
 * Author: James Even Chen https://evenc.org/
 * Description: Dynamically loads and renders Markdown files into <zero-md> elements.
 *
 * Features:
 * - Supports loading markdown files from:
 *   - Remote URLs (http/https)
 *   - Absolute paths (starting with `/`)
 *   - Relative file paths
 * - Auto-appends `.md` extension if missing
 * - Checks file existence via HTTP HEAD before loading
 * - Waits for <zero-md> element to be available before setting `src`
 * - Implements retry logic with exponential backoff (up to 3 attempts)
 * - Adds jitter delay (0–300ms) to stagger load requests when opening multiple tabs
 * - Updates document title dynamically from the first `<h1>` in the markdown content
 * - Handles missing or invalid markdown files gracefully with custom 404 redirect
 * - Includes fallback UI display on persistent load failures
 *
 * 2.1.0 Notes:
 *  - Fixed missing closing brace that broke execution in v2.0
 *  - Waits for <zero-md> element before attempting to load markdown
 *  - Improved .md extension handling to prevent duplication
 *  - Minor refactor for clarity and robustness
 *
 * 2.0.0 Notes:
 *  - Major refactor of structure and logic
 *  - Added robust URL normalization and error handling
 *  - Introduced jittered load timing and exponential retry logic
 *
 * 1.2.0 Notes:
 *  - Supports: Remote URLs, Absolute paths, Relative files
 *  - Includes: Retry logic, jitter delay, and custom 404 redirect
 *
 * 1.1.0 Notes:
 *  - Retries loading if Markdown content doesn't render.
 *  - Displays fallback message after max retries.
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
  if (!md_file.toLowerCase().endsWith('.md')) {
    md_file += '.md';
  }

  if (isFullURL) {
    applyJitterThenLoad(() => waitForZeroMdThenLoad(md_file));
  } else {
    let filePath;
    try {
      if (isAbsolutePath) {
        filePath = new URL(md_file, window.location.origin).href;
      } else {
        filePath = new URL(md_file, window.location.href).href;
      }
    } catch (e) {
      console.warn("Invalid markdown file URL.");
      window.location.href = '/404';
      return;
    }

    // Check if local/absolute file exists first
    fetch(filePath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          applyJitterThenLoad(() => waitForZeroMdThenLoad(filePath));
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
  function applyJitterThenLoad(callback) {
    const jitterDelay = Math.floor(Math.random() * 300); // 0–300ms
    setTimeout(callback, jitterDelay);
  }

  function waitForZeroMdThenLoad(file) {
    const checkInterval = 100;
    const maxAttempts = 30;
    let attempts = 0;

    const interval = setInterval(() => {
      const zeroMdElement = document.querySelector('zero-md');
      if (zeroMdElement) {
        clearInterval(interval);
        loadMarkdown(file);
      } else if (++attempts > maxAttempts) {
        clearInterval(interval);
        console.error("zero-md element not found after waiting.");
        alert("Page failed to load properly. Please refresh or contact support.");
      }
    }, checkInterval);
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

    if (zeroMdElement.getAttribute('src') !== file) {
      zeroMdElement.setAttribute('src', file);
    }

    let rendered = false;

    function renderHandler() {
      rendered = true;
      updateTitle(zeroMdElement);
      zeroMdElement.removeEventListener('zero-md-rendered', renderHandler);
    }

    zeroMdElement.addEventListener('zero-md-rendered', renderHandler);

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
    const parentTitle = document.title;

    if (h1Element) {
      document.title = `${h1Element.textContent} - ${parentTitle}`;
    } else {
      document.title = parentTitle;
    }
  }
});
