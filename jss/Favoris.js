let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const filmsContainer = document.getElementById('filmsContainer');

if (favorites.length === 0) {
  filmsContainer.innerHTML = "<p>Aucun film en favori pour le moment.</p>";
} else {
  favorites.forEach(movieId => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8c4b867188ee47a1d4e40854b27391ec`)
      .then(response => response.json())
      .then(movie => {
        filmsContainer.innerHTML += `
          <div class="col-lg-3 col-md-6">
            <div class="film-item">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="img-fluid">
              <h3 class="film-title">${movie.title}</h3>
              <p class="film-description">${movie.overview}</p>
            </div>
          </div>
        `;
      })
      .catch(error => console.error('Erreur lors de la récupération des détails du film:', error));
  });
}