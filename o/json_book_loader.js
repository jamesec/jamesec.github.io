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

        if (block.type === "text" && Array.isArray(block.words)) {
            block.words.forEach(wordObj => {
                const wordSpan = document.createElement("span");
                wordSpan.classList.add("word");

                if (wordObj.style === "style3") {
                    wordSpan.style.fontStyle = "italic";
                }

                const wordText = wordObj.text
                    ?? (wordObj.break_map && wordObj.break_map.text)
                    ?? "";

                wordSpan.innerText = wordText;

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

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    const button = document.getElementById("darkModeToggle");
    if (body.classList.contains("dark-mode")) {
        button.innerText = "🌞 Light Mode";
    } else {
        button.innerText = "🌙 Dark Mode";
    }
}

const urlParams = new URLSearchParams(window.location.search);
const jsonFile = urlParams.get('p');
if (jsonFile) {
    loadBookContent(jsonFile);
} else {
    alert("No JSON file specified!");
}
