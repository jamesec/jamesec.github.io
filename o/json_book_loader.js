// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const currentMode = body.classList.contains('dark-mode');
    body.classList.toggle('dark-mode', !currentMode);
}

// Function to fetch and render the book data from JSON
function loadBookData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => renderBookPage(data))
        .catch(error => console.error('Error loading the book:', error));
}

// Function to render the book data into the page
function renderBookPage(data) {
    const bookContent = document.getElementById("bookContent");
    bookContent.innerHTML = ""; // Clear previous content.

    data.blocks.forEach(block => {
        const blockDiv = document.createElement("div");
        blockDiv.classList.add("block");

        if (block.type === "text") {
            block.words.forEach(wordObj => {
                const wordSpan = document.createElement("span");
                wordSpan.classList.add("word");

                // Check if the word should be italic
                if (wordObj.style === "style3") {
                    wordSpan.style.fontStyle = "italic";
                }

                // Check for breaks and handle word concatenation
                if (wordObj.break_map) {
                    let fullText = "";

                    // Concatenate all parts of the word if split by the break map
                    let leftPart = wordObj.break_map.left ? wordObj.break_map.left.text : '';
                    let rightPart = wordObj.break_map.right ? wordObj.break_map.right.text : '';

                    fullText = leftPart + rightPart;

                    wordSpan.innerText = fullText; // Set the concatenated word
                } else {
                    wordSpan.innerText = wordObj.text; // Regular word with no break
                }

                blockDiv.appendChild(wordSpan);
            });
        }

        if (block.type === "spacer") {
            blockDiv.classList.add("spacer");
        }

        if (block.type === "page_break") {
            const pageBreakDiv = document.createElement("div");
            pageBreakDiv.classList.add("pageBreak");
            blockDiv.appendChild(pageBreakDiv);
        }

        bookContent.appendChild(blockDiv);
    });
}

// Wait for the document to load before fetching the book data
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const bookFile = params.get('p') || 'chapter1.json'; // Default to 'chapter1.json' if no 'p' param
    loadBookData(bookFile);
});
