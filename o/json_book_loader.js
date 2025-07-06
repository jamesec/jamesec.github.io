// This function loads the JSON and processes it to render text blocks.
function loadBookContent(jsonUrl) {
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            renderBookPage(data);
        })
        .catch(error => console.error("Error loading the JSON:", error));
}

// This function renders the book page, styling each block as needed.
function renderBookPage(data) {
    const bookContent = document.getElementById("bookContent");
    bookContent.innerHTML = ""; // Clear previous content.

    data.blocks.forEach(block => {
        const blockDiv = document.createElement("div");
        blockDiv.classList.add("block");

        if (block.type === "text" || block.type === "composite") {
            renderWords(block.words, blockDiv);
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

// Helper to render word objects safely
function renderWords(words, container) {
    words.forEach(wordObj => {
        if (!wordObj || typeof wordObj.text !== "string") return;

        const wordSpan = document.createElement("span");
        wordSpan.classList.add("word");

        if (wordObj.style === "style3") {
            wordSpan.style.fontStyle = "italic";
        }

        wordSpan.innerText = wordObj.text;
        container.appendChild(wordSpan);

        // Add space unless punctuation
        if (!/[.,!?;:”’"]$/.test(wordObj.text)) {
            container.appendChild(document.createTextNode(" "));
        }
    });
}

// Toggle light/dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    const button = document.getElementById("darkModeToggle");
    button.innerText = body.classList.contains("dark-mode")
        ? "🌞 Light Mode"
        : "🌙 Dark Mode";
}

// Load JSON from query string
const urlParams = new URLSearchParams(window.location.search);
const jsonFile = urlParams.get('p');
if (jsonFile) {
    loadBookContent(jsonFile);
} else {
    alert("No JSON file specified!");
}
