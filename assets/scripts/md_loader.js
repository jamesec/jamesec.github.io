document.addEventListener('DOMContentLoaded', function() {
    const searchParams = new URLSearchParams(window.location.search);
    let md_file = searchParams.get('p');

    if (!md_file) {
        alert("No markdown file specified.");
        return;
    }

    let isFullURL = md_file.startsWith('http://') || md_file.startsWith('https://');
    let isAbsolutePath = md_file.startsWith('/');

    if (isFullURL) {
        loadRemoteMarkdown(md_file);
    } else if (isAbsolutePath) {
        // Add .md if it doesn't end with .md
        if (!md_file.endsWith('.md')) {
            md_file += ".md";
        }
        checkAbsoluteFile(md_file);
    } else {
        // Local relative file in same folder as HTML
        if (!md_file.endsWith('.md')) {
            md_file += ".md";
        }
        checkLocalFile(md_file);
    }

    function loadRemoteMarkdown(url) {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    setMarkdownSrc(url);
                } else {
                    alert("The markdown file you're trying to load doesn't exist:\n" + url);
                    console.error("Remote markdown file not found: " + url);
                }
            })
            .catch(error => {
                alert("There was an error loading the remote markdown file:\n" + error);
                console.error("Error loading remote file: " + error);
            });
    }

    function checkAbsoluteFile(file) {
        fetch(file, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    setMarkdownSrc(file);
                } else {
                    window.location.href = '/404';
                }
            })
            .catch(error => {
                console.error("Error checking absolute file: " + error);
                window.location.href = '/404';
            });
    }

    function checkLocalFile(file) {
        fetch(file, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    setMarkdownSrc(file);
                } else {
                    window.location.href = '/404';
                }
            })
            .catch(error => {
                console.error("Error checking local file: " + error);
                window.location.href = '/404';
            });
    }

    function setMarkdownSrc(file) {
        const zeroMdElement = document.querySelector('zero-md');
        zeroMdElement.setAttribute('src', file);

        zeroMdElement.addEventListener('zero-md-rendered', function() {
            updateTitle(zeroMdElement);
        });
    }

    function updateTitle(zeroMdElement) {
        const h1Element = zeroMdElement.shadowRoot.querySelector('h1');
        const title = h1Element ? h1Element.textContent : 'Untitled';
        document.title = title + " - James Even Chen";
    }
});
