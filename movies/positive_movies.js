const grid = document.getElementById("film-grid");

fetch("positive_movies.json")
  .then(res => res.json())
  .then(films => {
    films.forEach(film => {
      const link = document.createElement("a");
      link.href = `/o/s.htm?p=/movies/${film.imdb_id}`;
      link.className = "film-link"; // optional: for styling
      link.target = "_blank"; // optional: open in new tab

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
      link.appendChild(card);
      grid.appendChild(link);
    });
  })
  .catch(err => {
    grid.innerHTML = "<p>Error loading films.</p>";
    console.error("Failed to load positive_movies.json", err);
  });
