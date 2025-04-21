const grid = document.getElementById("film-grid");
const loadingMessage = document.getElementById("loading-message");

let allFilms = [];
let filmsLoaded = 0;
const batchSize = 15;
let loading = false;

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

  const batch = allFilms.slice(filmsLoaded, filmsLoaded + batchSize);
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

  if (filmsLoaded >= allFilms.length) {
    window.removeEventListener("scroll", handleScroll);
  }
}

function handleScroll() {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (nearBottom && !loading) {
    loadNextBatch();
  }
}
