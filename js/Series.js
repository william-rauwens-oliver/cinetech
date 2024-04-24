// Déclaration des constantes
const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = 'https://api.themoviedb.org/3/discover/tv?api_key=' + maConst; // Modification ici pour les séries TV
const seriesContainer = document.getElementById('seriesContainer'); // Modifier le conteneur des séries

// Fonction pour charger les détails de la série
function loadSeriesDetails(seriesId) {
    // Utiliser l'ID de la série pour récupérer les détails de la série depuis l'API
    fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${maConst}`)
        .then(response => response.json())
        .then(data => {
            // Afficher les détails de la série sur la page
            // Vous pouvez mettre à jour le contenu de la page avec les détails de la série ici
            console.log(data); // Exemple de traitement des données de la série
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données de la série:', error);
        });
}

// Fonction pour créer et afficher un élément représentant une série
function renderSeries(series) {
    const seriesItem = document.createElement('div');
    seriesItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

    seriesItem.innerHTML = `
        <div class="block-images position-relative">
            <div class="img-box">
                <img src="https://image.tmdb.org/t/p/w500${series.poster_path}" class="img-fluid" alt="${series.name}" />
            </div>
            <div class="block-description">
                <h6 class="iq-title">
                    <a href="#">${series.name}</a>
                </h6>
                <div class="movie-time d-flex align-items-center my-2">
                    <div class="badge badge-secondary p-1 mr-2">${series.adult ? '18+' : 'All ages'}</div>
                    <span class="text-white">${series.episode_run_time ? formatRuntime(series.episode_run_time[0]) : 'N/A'}</span> <!-- Utiliser le temps d'exécution de l'épisode -->
                </div>
                <div class="hover-buttons">
                    <span class="btn btn-hover iq-button play-now">
                        <i class="fa fa-play mr-1"></i>
                        Play Now
                    </span>
                    <button class="btn btn-link favorite-btn" data-id="${series.id}">
                        <i class="fa fa-heart"></i> Add to Favorites
                    </button>
                </div>
            </div>
            <div class="block-social-info">
                <ul class="list-inline p-0 m-0 music-play-lists">
                    <!-- Social icons here -->
                </ul>
            </div>
        </div>
    `;

    // Ajouter un gestionnaire d'événements sur le bouton "Play Now"
    const playNowButton = seriesItem.querySelector('.play-now');
    playNowButton.addEventListener('click', () => {
        // Redirection vers la page principale avec l'ID de la série en tant que paramètre de requête
        window.location.href = `Details.html?id=${series.id}`;
    });

    // Ajouter un gestionnaire d'événements sur le bouton de favoris
    const favoriteButton = seriesItem.querySelector('.favorite-btn');
    favoriteButton.addEventListener('click', () => {
        // Ajoutez ici votre logique pour ajouter la série aux favoris
        console.log('Ajouter la série avec ID ' + series.id + ' aux favoris.');
        // Ajouter la série aux favoris localement
        addToFavorites(series.id);
    });

    // Ajouter l'élément de la série au conteneur
    seriesContainer.appendChild(seriesItem);
}

// Fonction pour ajouter une série aux favoris
function addToFavorites(seriesId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(seriesId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Charger les données des séries depuis l'API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Pour chaque série, créer et afficher un élément représentant la série
        data.results.forEach(series => {
            renderSeries(series);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données des séries:', error);
    });
