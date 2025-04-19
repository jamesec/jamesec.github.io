const grid = document.getElementById("film-grid");

fetch("films.json")
  .then(res => res.json())
  .then(films => {
    films.forEach(film => {
      const card = document.createElement("div");
      card.className = "film-card";

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w780${film.poster_path}`;
      img.alt = film.title;

      const title = document.createElement("div");
      title.className = "film-title";
      title.textContent = `${film.title} (${film.year})`;

      card.appendChild(img);
      card.appendChild(title);
      grid.appendChild(card);
    });
  })
  .catch(err => {
    grid.innerHTML = "<p>Error loading films.</p>";
    console.error("Failed to load films.json", err);
  });
