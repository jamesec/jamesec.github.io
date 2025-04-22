const grid = document.getElementById("film-grid");
const loadingMessage = document.getElementById("loading-message");
const categorySelect = document.getElementById("category-select");
const virtueSelect = document.getElementById("virtue-select");

let allFilms = [];
let filmsLoaded = 0;
const batchSize = 15;
let loading = false;
let cardHeight = 220; // This is an estimated height for a film card
let cardsNeededToFillHeight = 0;

// Category and virtue mapping
const virtuesData = {
  Wisdom: ["Creativity", "Curiosity", "Judgment", "Love of Learning", "Perspective"],
  Courage: ["Bravery", "Perseverance", "Honesty", "Zest"],
  Humanity: ["Love", "Kindness", "Social Intelligence"],
  Justice: ["Teamwork", "Fairness", "Leadership"],
  Temperance: ["Forgiveness", "Humility", "Prudence", "Self-Regulation"],
  Transcendence: ["Appreciation of Beauty and Excellence", "Gratitude", "Hope", "Humor", "Spirituality"]
};

// Map virtue names to codes like "Wisdom.1"
const virtueCodeMap = {
  "Creativity": "Wisdom.1",
  "Curiosity": "Wisdom.2",
  "Judgment": "Wisdom.3",
  "Love of Learning": "Wisdom.4",
  "Perspective": "Wisdom.5",
  "Bravery": "Courage.1",
  "Perseverance": "Courage.2",
  "Honesty": "Courage.3",
  "Zest": "Courage.4",
  "Love": "Humanity.1",
  "Kindness": "Humanity.2",
  "Social Intelligence": "Humanity.3",
  "Teamwork": "Justice.1",
  "Fairness": "Justice.2",
  "Leadership": "Justice.3",
  "Forgiveness": "Temperance.1",
  "Humility": "Temperance.2",
  "Prudence": "Temperance.3",
  "Self-Regulation": "Temperance.4",
  "Appreciation of Beauty and Excellence": "Transcendence.1",
  "Gratitude": "Transcendence.2",
  "Hope": "Transcendence.3",
  "Humor": "Transcendence.4",
  "Spirituality": "Transcendence.5"
};

// Handle category change
categorySelect.addEventListener("change", () => {
  if (categorySelect.value === "__reset__") {
    resetFilters();
    return;
  }

  const category = categorySelect.value;
  virtueSelect.innerHTML = "<option value=''>Select Virtue</option>";

  const virtues = virtuesData[category] || [];
  virtues.forEach(virtue => {
    const option = document.createElement("option");
    option.value = virtue;
    option.textContent = virtue;
    virtueSelect.appendChild(option);
  });

  // Add reset option at the end
  const resetOption = document.createElement("option");
  resetOption.value = "__reset__";
  resetOption.textContent = "Show all / reset filters";
  virtueSelect.appendChild(resetOption);

  resetAndLoad();
});

// Handle virtue change
virtueSelect.addEventListener("change", () => {
  if (virtueSelect.value === "__reset__") {
    resetFilters();
    return;
  }

  resetAndLoad();
});

function resetFilters() {
  categorySelect.value = "";
  virtueSelect.innerHTML = "<option value=''>Select Virtue</option>";

  const resetOption = document.createElement("option");
  resetOption.value = "__reset__";
  resetOption.textContent = "Show all / reset filters";
  virtueSelect.appendChild(resetOption);

  resetAndLoad();
}

function resetAndLoad() {
  filmsLoaded = 0;
  grid.innerHTML = "";
  loadNextBatch();

  // Re-attach scroll listener after reset
  window.removeEventListener("scroll", handleScroll);
  window.addEventListener("scroll", handleScroll);
  recalculateCardsNeededToFillHeight(); // Recalculate number of cards based on new height
}

// Fetch and initialize
fetch("positive_movies.json")
  .then(res => res.json())
  .then(films => {
    allFilms = films;
    loadNextBatch();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", recalculateCardsNeededToFillHeight);
    recalculateCardsNeededToFillHeight(); // Recalculate on first load
  })
  .catch(err => {
    grid.innerHTML = "<p>Error loading films.</p>";
    console.error("Failed to load positive_movies.json", err);
  });

// Function to recalculate the number of cards needed to fill the viewport height
function recalculateCardsNeededToFillHeight() {
  const cardsInView = Math.floor(window.innerHeight / cardHeight);
  cardsNeededToFillHeight = cardsInView > 0 ? cardsInView : 1; // Ensure we load at least one card
  loadNextBatch();
}

function loadNextBatch() {
  if (loading) return;

  loading = true;
  loadingMessage.style.display = "block";

  const selectedCategory = categorySelect.value;
  const selectedVirtue = virtueSelect.value;

  const filteredFilms = allFilms.filter(film => {
    const virtues = film.virtues || [];

    if (selectedCategory && selectedCategory !== "__reset__") {
      if (!virtues.some(v => v.startsWith(selectedCategory + "."))) return false;
    }

    if (selectedVirtue && selectedVirtue !== "__reset__") {
      const virtueCode = virtueCodeMap[selectedVirtue];
      if (!virtueCode || !virtues.includes(virtueCode)) return false;
    }

    return true;
  });

  // Load at least enough cards to fill the screen or 15 cards
  const batch = filteredFilms.slice(filmsLoaded, filmsLoaded + Math.max(batchSize, cardsNeededToFillHeight));

  batch.forEach(film => {
    const card = document.createElement("div");
    card.className = "film-card";

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w780${film.poster_path}`;
    img.alt = film.title;
    img.loading = "lazy";

    const title = document.createElement("div");
    title.className = "film-title";
    title.textContent = `${film.title} (${film.year})`;

    card.appendChild(img);
    card.appendChild(title);

    if (film.has_review) {
      const link = document.createElement("a");
      link.href = `/o/s.htm?p=/movies/${film.imdb_id}`;
      link.target = "_blank";
      link.appendChild(card);
      grid.appendChild(link);
    } else {
      grid.appendChild(card);
    }
  });

  filmsLoaded += batch.length;
  loading = false;
  loadingMessage.style.display = "none";

  if (filmsLoaded >= filteredFilms.length) {
    window.removeEventListener("scroll", handleScroll);
  }
}

function handleScroll() {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - (window.innerHeight * 0.1);
  if (nearBottom && !loading) {
    loadNextBatch();
  }
}
