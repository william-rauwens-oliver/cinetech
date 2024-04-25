document.addEventListener('DOMContentLoaded', function () {
  const seriesContainer = document.getElementById('seriesContainer');

  function removeFromFavorites(seriesId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(seriesId);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length === 0) {
      seriesContainer.innerHTML = "<p>Aucune série en favori pour le moment.</p>";
    } else {
      seriesContainer.innerHTML = "";
      favorites.forEach(seriesId => {
        fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=8c4b867188ee47a1d4e40854b27391ec&language=fr-FR`)
          .then(response => response.json())
          .then(series => {
            const seriesItem = document.createElement('div');
            seriesItem.classList.add('col-lg-3', 'col-md-6');
            seriesItem.innerHTML = `
              <div class="series-item">
                <img src="https://image.tmdb.org/t/p/w500/${series.poster_path}" alt="${series.name}" class="img-fluid">
                <h3 class="series-title">${series.name}</h3>
                <p class="series-description">${series.overview}</p>
                <h4>Commentaires:</h4>
                <ul class="comment-list"></ul> <!-- Conteneur pour les commentaires -->
                <button class="btn btn-danger delete-button" data-id="${series.id}">Supprimer</button>
              </div>
            `;
            seriesContainer.appendChild(seriesItem);
            
            // Récupération et affichage des commentaires
            const commentList = seriesItem.querySelector('.comment-list');
            const commentsKey = `comments_${series.id}`;
            const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
            comments.forEach(commentText => {
              const commentItem = document.createElement('li');
              commentItem.textContent = commentText;
              commentList.appendChild(commentItem);
            });
          })
          .catch(error => console.error('Erreur lors de la récupération des détails de la série TV:', error));
      });
    }
  }

  seriesContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
      const seriesId = event.target.getAttribute('data-id');
      removeFromFavorites(seriesId);
      event.target.parentNode.remove();
    }
  });

  displayFavorites();
});
