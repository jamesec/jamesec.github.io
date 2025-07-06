function loadBookContent(jsonUrl) {
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            renderBookPage(data);
        })
        .catch(error => console.error("Error loading the JSON:", error));
}

function renderBookPage(data) {
    const bookContent = document.getElementById("bookContent");
    bookContent.innerHTML = ""; // Clear previous content

    data.blocks.forEach(block => {
        const blockDiv = document.createElement("div");
        blockDiv.classList.add("block");

        if (block.type === "text") {
            block.words.forEach(wordObj => {
                appendWordToBlock(blockDiv, wordObj);
            });
        }

        if (block.type === "composite") {
            // composite blocks contain a `words` array
            block.words.forEach(wordObj => {
                appendWordToBlock(blockDiv, wordObj);
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

function appendWordToBlock(blockDiv, wordObj) {
    const wordSpan = document.createElement("span");
    wordSpan.classList.add("word");

    if (wordObj?.style === "style3") {
        wordSpan.style.fontStyle = "italic";
    }

    // Fallback safely to avoid undefined
    wordSpan.innerText = wordObj?.text ?? "";

    blockDiv.appendChild(wordSpan);
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    const button = document.getElementById("darkModeToggle");
    button.innerText = body.classList.contains("dark-mode")
        ? "🌞 Light Mode"
        : "🌙 Dark Mode";
}

// Load JSON based on query parameter
const urlParams = new URLSearchParams(window.location.search);
const jsonFile = urlParams.get('p');
if (jsonFile) {
    loadBookContent(jsonFile);
} else {
    alert("No JSON file specified!");
}
