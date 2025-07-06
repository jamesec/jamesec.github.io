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
    bookContent.innerHTML = "";

    data.blocks.forEach(block => {
        const blockDiv = document.createElement("div");
        blockDiv.classList.add("block");

        if (block.type === "text" || block.type === "composite") {
            const words = block.type === "composite" ? block.words : block.words;

            words.forEach(wordObj => {
                const wordSpan = document.createElement("span");
                wordSpan.classList.add("word");

                // Use break_map.text if available, else fallback to wordObj.text
                const displayText = wordObj?.break_map?.text || wordObj?.text;
                if (!displayText) return; // Skip if still undefined

                if (wordObj.style === "style3") {
                    wordSpan.style.fontStyle = "italic";
                }

                wordSpan.innerText = displayText;
                blockDiv.appendChild(wordSpan);

                // Add space after each word unless it's punctuation
                if (!/[.,!?;:\u201d”]/.test(displayText.slice(-1))) {
                    blockDiv.appendChild(document.createTextNode(" "));
                }
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

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    const button = document.getElementById("darkModeToggle");
    button.innerText = body.classList.contains("dark-mode")
        ? "🌞 Light Mode"
        : "🌙 Dark Mode";
}

const urlParams = new URLSearchParams(window.location.search);
const jsonFile = urlParams.get("p");
if (jsonFile) {
    loadBookContent(jsonFile);
} else {
    alert("No JSON file specified!");
}
