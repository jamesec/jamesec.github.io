const grid = document.getElementById("film-grid");
const loadingMessage = document.getElementById("loading-message");
const categorySelect = document.getElementById("category-select");
const virtueSelect = document.getElementById("virtue-select");

let allFilms = [];
let filmsLoaded = 0;
const batchSize = 15;
let loading = false;

// Category and virtue mapping
const virtuesData = {
  Wisdom: [
    "Creativity", "Curiosity", "Judgment", "Love of Learning", "Perspective"
  ],
  Courage: [
    "Bravery", "Perseverance", "Honesty", "Zest"
  ],
  Humanity: [
    "Love", "Kindness", "Social Intelligence"
  ],
  Justice: [
    "Teamwork", "Fairness", "Leadership"
  ],
  Temperance: [
    "Forgiveness", "Humility", "Prudence", "Self-Regulation"
  ],
  Transcendence: [
    "Appreciation of Beauty and Excellence", "Gratitude", "Hope", "Humor", "Spirituality"
  ]
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

// Populate virtues dropdown on category selection
categorySelect.addEventListener("change", () => {
  const category = categorySelect.value;
  virtueSelect.innerHTML = "<option value=''>Select Virtue</option>";
  const virtues = virtuesData[category] || [];

  virtues.forEach(virtue => {
    const option = document.createElement("option");
    option.value = virtue;
    option.textContent = virtue;
    virtueSelect.appendChild(option);
  });

  resetAndLoad();
});

virtueSelect.addEventListener("change", () => {
  resetAndLoad();
});

function resetAndLoad() {
  filmsLoaded = 0;
  grid.innerHTML = "";  // Clear current grid content
  loadNextBatch();  // Load the first batch of films after reset
}

// Fetch and initialize
fetch("positive_movies.json")
  .then(res => res.json())
  .then(films => {
    console.log("Loaded films:", films);
    allFilms = films;
    loadNextBatch();  // Load first batch when films are fetched
    window.addEventListener("scroll", handleScroll);  // Listen for scroll to load more
  })
  .catch(err => {
    grid.innerHTML = "<p>Error loading films.</p>";
    console.error("Failed to load positive_movies.json", err);
  });

// Function to load the next batch of films for lazy loading
function loadNextBatch() {
  if (loading) return;

  loading = true;
  loadingMessage.style.display = "block";

  const selectedCategory = categorySelect.value;
  const selectedVirtue = virtueSelect.value;

  let filteredFilms = allFilms;

  // Apply filters (if any) for category and virtue
  filteredFilms = allFilms.filter(film => {
    const virtues = film.virtues || [];

    // Filter by category
    if (selectedCategory && !virtues.some(v => v.startsWith(selectedCategory + "."))) {
      return false;
    }

    // Filter by specific virtue
    if (selectedVirtue) {
      const virtueCode = virtueCodeMap[selectedVirtue];
      if (!virtueCode || !virtues.includes(virtueCode)) {
        return false;
      }
    }

    return true;
  });

  const batch = filteredFilms.slice(filmsLoaded, filmsLoaded + batchSize);

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

  // Continue lazy loading if we haven't loaded all films
  if (filmsLoaded < filteredFilms.length) {
    window.addEventListener("scroll", handleScroll);
  } else {
    window.removeEventListener("scroll", handleScroll);
  }
}

function handleScroll() {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (nearBottom && !loading) {
    loadNextBatch();
  }
}

// Get the reset button
const resetButton = document.getElementById("reset-filters");

// Reset button functionality: Reset filters but maintain lazy loading
resetButton.addEventListener("click", () => {
  // Clear the selected values
  categorySelect.value = "";
  virtueSelect.value = "";

  // Clear the hash (URL)
  location.hash = "";

  // Reload films with no filters and maintain lazy loading behavior
  filmsLoaded = 0;
  grid.innerHTML = "";
  loadNextBatch();  // Start loading first batch after reset
});
