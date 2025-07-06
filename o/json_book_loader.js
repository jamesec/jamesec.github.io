// Load JSON and render book content
function loadBookContent(jsonUrl) {
  fetch(jsonUrl)
    .then(r => r.json())
    .then(data => renderBookPage(data))
    .catch(err => console.error("Error loading JSON:", err));
}

// Render all blocks in #bookContent
function renderBookPage(data) {
  const container = document.getElementById("bookContent");
  container.innerHTML = "";

  data.blocks.forEach(block => {
    const div = document.createElement("div");
    div.classList.add("block");

    if (block.type === "text") {
      const text = extractTextFromBlock(block);
      appendTextToDiv(div, text, block.words);
    }

    if (block.type === "spacer") {
      div.classList.add("spacer");
    }

    if (block.type === "page_break") {
      const pb = document.createElement("div");
      pb.classList.add("pageBreak");
      div.appendChild(pb);
    }

    container.appendChild(div);
  });
}

// Convert a block’s words list into a clean string
function extractTextFromBlock(block) {
  if (!block?.words?.length) return "";
  return block.words
    .map(w => {
      if (w.type === "composite" && Array.isArray(w.words)) {
        return w.words.map(extractSimple).join("");
      }
      return extractSimple(w);
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([.,;:!?”’"])/g, "$1") // tidy punctuation spacing
    .trim();
}

// Extract text from a simple word object
function extractSimple(w) {
  if (!w) return "";

  if (w.break_map?.text) return w.break_map.text;
  if (typeof w.text === "string") return w.text;

  return "";
}

// Put text into spans, preserving styling and footnote links
function appendTextToDiv(div, text, words) {
  const segments = text.split(/(\u00b9)/); // split for footnote marker "¹"

  let wordIdx = 0;
  segments.forEach(seg => {
    if (seg === "\u00b9") {
      const foot = document.createElement("a");
      foot.href = "#comment-" + (wordIdx++);
      foot.textContent = seg;
      foot.classList.add("footnote-link");
      div.appendChild(foot);
      div.appendChild(document.createTextNode(" "));
      return;
    }

    seg.split(" ").forEach(token => {
      const span = document.createElement("span");
      span.classList.add("word");

      // Apply italic if original style is style3
      const orig = words[wordIdx++];
      if (orig?.style === "style3") {
        span.style.fontStyle = "italic";
      }

      span.textContent = token;
      div.appendChild(span);
      div.appendChild(document.createTextNode(" "));
    });
  });
}

// Dark mode toggle (optional)
function toggleDarkMode() {
  const b = document.body;
  b.classList.toggle("dark-mode");
  document.getElementById("darkModeToggle").innerText =
    b.classList.contains("dark-mode") ? "🌞 Light Mode" : "🌙 Dark Mode";
}

// Initialize on page load
const p = new URLSearchParams(window.location.search).get("p");
if (p) loadBookContent(p);
else alert("No JSON file specified!");
