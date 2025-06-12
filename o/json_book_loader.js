function loadJsonAndRender() {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('p');

    if (!fileName) {
        alert('No file specified.');
        return;
    }

    // Try fetching the JSON file from the given URL
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.json();
        })
        .then(data => renderPage(data))
        .catch(error => {
            console.error('Error loading JSON:', error);
            alert('Error loading the chapter file. Please ensure the file exists.');
        });
}

function renderPage(data) {
    const container = document.getElementById('content');
    container.innerHTML = ''; // Clear any previous content

    // Loop through each block in the JSON
    data.blocks.forEach(block => {
        if (block.type === 'spacer') {
            container.appendChild(createSpacer(block));
        } else if (block.type === 'text') {
            container.appendChild(createTextBlock(block));
        } else if (block.type === 'page_break') {
            container.appendChild(createPageBreak());
        }
    });
}

function createSpacer(block) {
    const spacer = document.createElement('div');
    spacer.style.height = `${block.size * 1.2}em`;
    return spacer;
}

function createTextBlock(block) {
    const textBlock = document.createElement('div');
    textBlock.style.textAlign = block.align || 'left';
    textBlock.style.fontSize = `${block.size}em`;
    textBlock.style.marginLeft = `${block.block_indent || 0}em`;
    textBlock.style.marginRight = `${block.right_indent || 0}em`;
    textBlock.style.marginBottom = '1em';
    textBlock.style.fontFamily = 'Arial, sans-serif';

    block.words.forEach(word => {
        let wordElement = document.createElement('span');
        wordElement.textContent = handleBreakMap(word);

        // If the word has style or font, apply it
        if (word.style === 'style3') {
            wordElement.style.fontStyle = 'italic';
        }

        textBlock.appendChild(wordElement);
    });

    return textBlock;
}

// Function to handle word breaks and properly concatenate split words
function handleBreakMap(word) {
    if (word.break_map) {
        const leftText = word.break_map.left ? word.break_map.left.text : '';
        const rightText = word.break_map.right ? word.break_map.right.text : '';
        return leftText + rightText; // Combine the split words properly
    } else {
        return word.text;
    }
}

function createPageBreak() {
    const pageBreak = document.createElement('div');
    pageBreak.style.pageBreakBefore = 'always';
    pageBreak.style.height = '2em';  // Visual separation for page breaks
    return pageBreak;
}

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

document.addEventListener('DOMContentLoaded', function () {
    loadJsonAndRender();

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
});
