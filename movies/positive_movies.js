const grid = document.getElementById("film-grid");
const loadingMessage = document.getElementById("loading-message");

let allFilms = [];
let filmsLoaded = 0;
const batchSize = 15;
let loading = false;

// Virtues data mapping (categories -> virtues)
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

// Populate the virtue dropdown dynamically based on category
const categorySelect = document.getElementById("category-select");
const virtueSelect = document.getElementById("virtue-select");

categorySelect.addEventListener("change", function() {
  const category = categorySelect.value;
  const virtues = virtuesData[category] || [];
  virtueSelect.innerHTML = "<option value=''>Select Virtue</option>"; // Reset virtues list

  virtues.forEach(virtue => {
    const option = document.createElement("option");
    option.value = virtue;
    option.textContent = virtue;
    virtueSelect.appendChild(option);
  });

  // Reset film grid when category/virtue changes
  filmsLoaded = 0;
  grid.innerHTML = "";
  loadNextBatch();
});

virtueSelect.addEventListener("change", function() {
  filmsLoaded = 0;
  grid.innerHTML = "";
  loadNextBatch();
});

// Fetch films and load initially
fetch("positive_movies.json")
  .then(res => res.json())
  .then(films => {
    allFilms = films;
    loadNextBatch();
    window.addEventListener("scroll", handleScroll);
  })
  .catch(err => {
    grid.innerHTML = "<p>Error loading films.</p>";
    console.error("Failed to load positive_movies.json", err);
  });

function loadNextBatch() {
  if (loading || filmsLoaded >= allFilms.length) return;

  loading = true;
  loadingMessage.style.display = "block";

  // Filter films based on selected category and virtue
  const selectedCategory = categorySelect.value;
  const selectedVirtue = virtueSelect.value;

  const filteredFilms = allFilms.filter(film => {
    const virtues = film.virtues || [];
    return (
      (!selectedCategory || virtues.some(v => v.startsWith(selectedCategory))) &&
      (!selectedVirtue || virtues.includes(`${selectedCategory}.1`))
    );
  });

  const batch = filteredFilms.slice(filmsLoaded, filmsLoaded + batchSize);
  batch.forEach(film => {
    const card = document.createElement("div");
    card.className = "film-card";

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w780${film.poster_path}`;
    img.alt = film.title;
    img.loading = "lazy"; // Native lazy loading

    const title = document.createElement("div");
    title.className = "film-title";
    title.textContent = `${film.title} (${film.year})`;

    card.appendChild(img);
    card.appendChild(title);

    if (film.has_review) {
      const link = document.createElement("a");
      link.href = `/o/s.htm?p=/movies/${film.imdb_id}`;
      link.className = "film-link";
      link.target = "_blank";
      link.appendChild(card);
      grid.insertBefore(link, loadingMessage);
    } else {
      grid.insertBefore(card, loadingMessage);
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
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (nearBottom && !loading) {
    loadNextBatch();
  }
}
