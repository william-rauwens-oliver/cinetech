document.addEventListener('DOMContentLoaded', function () {
  const filmsContainer = document.getElementById('filmsContainer');

  function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(movieId);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.length === 0) {
    filmsContainer.innerHTML = "<p>Aucun film en favori pour le moment.</p>";
  } else {
    favorites.forEach(movieId => {
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8c4b867188ee47a1d4e40854b27391ec&language=fr-FR`)
        .then(response => response.json())
        .then(movie => {
          filmsContainer.innerHTML += `
            <div class="col-lg-3 col-md-6">
              <div class="film-item">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="img-fluid">
                <h3 class="film-title">${movie.title}</h3>
                <p class="film-description">${movie.overview}</p>
                <button class="btn btn-danger delete-button" data-id="${movie.id}">Supprimer</button>
              </div>
            </div>
          `;
        })
        .catch(error => console.error('Erreur lors de la récupération des détails du film:', error));
    });
  }

  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function () {
      const movieId = this.getAttribute('data-id');
      removeFromFavorites(movieId);
      this.parentNode.remove();
    });
  });
});