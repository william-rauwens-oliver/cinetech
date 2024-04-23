const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const api = 'https://api.themoviedb.org/3/discover/movie?api_key=' + maConst;

fetch(api)
  .then(response => response.json())
  .then(data => {
    const filmsContainer = document.getElementById('filmsContainer');

    data.results.forEach(film => {
      const filmItem = document.createElement('div');
      filmItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

      filmItem.innerHTML = `
        <div class="block-images position-relative">
          <div class="img-box">
            <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" class="img-fluid" alt="${film.title}" />
          </div>
          <div class="block-description">
            <h6 class="iq-title">
              <a href="#">${film.title}</a>
            </h6>
            <div class="movie-time d-flex align-items-center my-2">
              <div class="badge badge-secondary p-1 mr-2">${film.adult ? '18+' : 'All ages'}</div>
              <span class="text-white">${formatRuntime(film.runtime)}</span>
            </div>
            <div class="hover-buttons">
              <span class="btn btn-hover iq-button">
                <i class="fa fa-play mr-1"></i>
                Play Now
              </span>
              <span class="btn btn-hover iq-button" onclick="addToFavorites(${film.id})">
                <i class="fa fa-heart"></i>
              </span>
            </div>
          </div>
          <div class="block-social-info">
            <ul class="list-inline p-0 m-0 music-play-lists">
              <li class="share">
                <span><i class="fa fa-share-alt"></i></span>
                <div class="share-box">
                  <div class="d-flex align-items-center">
                    <a href="#" class="share-ico"><i class="fa fa-share-alt"></i></a>
                    <a href="#" class="share-ico"><i class="fa fa-youtube"></i></a>
                    <a href="#" class="share-ico"><i class="fa fa-instagram"></i></a>
                  </div>
                </div>
              </li>
              <li>
                <span><i class="fa fa-heart"></i></span>
                <span class="count-box">${film.vote_count}</span>
              </li>
              <li>
                <span><i class="fa fa-plus"></i></span>
              </li>
            </ul>
          </div>
        </div>
      `;

      filmsContainer.appendChild(filmItem);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données:', error);
  });

// Fonction utilitaire pour formater la durée du film en heures et minutes
function formatRuntime(runtime) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}min`;
}

// Fonction pour ajouter le film aux favoris dans le stockage local
function addToFavorites(movieId) {
  // Vérifier si des films sont déjà enregistrés dans les favoris
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Vérifier si le film est déjà dans les favoris
  if (!favorites.includes(movieId)) {
    // Ajouter le film aux favoris s'il n'est pas déjà présent
    favorites.push(movieId);
    // Mettre à jour les favoris dans le stockage local
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Film ajouté aux favoris avec succès !');
    // Vous pouvez ajouter ici une logique pour mettre à jour l'interface utilisateur
  } else {
    console.log('Ce film est déjà dans les favoris.');
  }
}
