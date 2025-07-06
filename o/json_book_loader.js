function loadBookContent(jsonUrl) {
  fetch(jsonUrl)
    .then(r => r.json())
    .then(data => renderBookPage(data))
    .catch(err => console.error("Error loading JSON:", err));
}

function renderBookPage(data) {
  const container = document.getElementById("bookContent");
  container.innerHTML = "";

  data.blocks.forEach(block => {
    const div = document.createElement("div");
    div.classList.add("block");

    if (block.type === "text") {
      appendWords(block.words, div);
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

function appendWords(wordsArray, container) {
  wordsArray.forEach(wordObj => {
    if (wordObj.type === "composite" && Array.isArray(wordObj.words)) {
      wordObj.words.forEach(inner => appendSingle(inner, container));
    } else {
      appendSingle(wordObj, container);
    }
  });
}

function appendSingle(w, container) {
  const text = w?.break_map?.text || w?.text;
  if (!text) return;

  const span = document.createElement("span");
  span.classList.add("word");

  // 🟢 Preserve style class from JSON
  if (w.style) {
    span.classList.add(w.style);
  }

  span.textContent = text;
  container.appendChild(span);

  if (!/[.,!?;:”’"]$/.test(text)) {
    container.appendChild(document.createTextNode(" "));
  }
}

function toggleDarkMode() {
  const b = document.body;
  b.classList.toggle("dark-mode");
  document.getElementById("darkModeToggle").innerText =
    b.classList.contains("dark-mode") ? "🌞 Light Mode" : "🌙 Dark Mode";
}

const p = new URLSearchParams(window.location.search).get("p");
if (p) loadBookContent(p);
else alert("No JSON file specified!");
