// This function loads the JSON and processes it to render text blocks.
function loadBookContent(jsonUrl) {
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Loaded data:', data); // Debugging: log the data to check
            renderBookPage(data);
        })
        .catch(error => {
            console.error("Error loading the JSON:", error);
            alert("Error loading the JSON file. Please ensure the file exists and the path is correct.");
        });
}

// This function renders the book page, styling each block as needed.
function renderBookPage(data) {
    const bookContent = document.getElementById("bookContent");
    bookContent.innerHTML = ""; // Clear previous content.

    // Debugging: Check if the "blocks" array exists and has content
    if (!data.blocks || data.blocks.length === 0) {
        console.error('No blocks found in the JSON data');
        return;
    }

    data.blocks.forEach(block => {
        const blockDiv = document.createElement("div");
        blockDiv.classList.add("block");

        if (block.type === "text") {
            block.words.forEach(wordObj => {
                const wordSpan = document.createElement("span");
                wordSpan.classList.add("word");

                // Check if the word has a break_map (split word)
                if (wordObj.break_map) {
                    const leftText = wordObj.break_map.left ? wordObj.break_map.left.text : '';
                    const rightText = wordObj.break_map.right ? wordObj.break_map.right.text : '';

                    // Combine the parts
                    wordSpan.innerText = leftText + rightText;  // Joining the left and right parts

                    // Check if the word should be italicized
                    if (wordObj.style === "style3") {
                        wordSpan.style.fontStyle = "italic";
                    }
                } else {
                    wordSpan.innerText = wordObj.text;  // Normal word rendering

                    // Check if the word should be italicized
                    if (wordObj.style === "style3") {
                        wordSpan.style.fontStyle = "italic";
                    }
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

// This function toggles between light and dark mode.
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

// Check for query parameter for the JSON file and load it
const urlParams = new URLSearchParams(window.location.search);
const jsonFile = urlParams.get('p');
if (jsonFile) {
    loadBookContent(jsonFile);
} else {
    alert("No JSON file specified!");
}
