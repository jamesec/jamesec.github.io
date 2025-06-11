// This function loads the JSON file from the URL query parameter and renders it
function loadBookPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const jsonFile = urlParams.get('p');  // Fetch the 'p' parameter (e.g., 'chapter1.json')

    if (!jsonFile) {
        alert('Error: No chapter file specified!');
        return;
    }

    fetch(jsonFile)
        .then(response => response.json())
        .then(data => renderPage(data))
        .catch(error => console.error('Error loading the JSON file:', error));
}

// This function takes the JSON data and formats it into HTML
function renderPage(data) {
    const contentDiv = document.getElementById('content');
    
    // Title
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = data.title || 'Untitled Page';
    contentDiv.appendChild(title);

    // Process each block in the JSON
    data.blocks.forEach(block => {
        if (block.type === 'spacer') {
            contentDiv.appendChild(createSpacer(block.size));
        } else if (block.type === 'text') {
            contentDiv.appendChild(createTextBlock(block));
        }
    });
}

// This function creates a block of text from the JSON data
function createTextBlock(block) {
    const blockDiv = document.createElement('div');
    blockDiv.classList.add('block');

    let textContent = block.words.map(word => word.text).join(' ');
    
    // Apply alignment
    if (block.align === 'center') {
        blockDiv.classList.add('center');
    }

    blockDiv.textContent = textContent;
    return blockDiv;
}

// This function creates a spacer element based on the size
function createSpacer(size) {
    const spacerDiv = document.createElement('div');
    spacerDiv.classList.add('spacer');
    spacerDiv.style.height = `${size * 20}px`;  // Adjust height based on the spacer size
    return spacerDiv;
}

// Load the book page when the window loads
window.onload = loadBookPage;
