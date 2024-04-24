// Déclaration des constantes
const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + maConst;
const filmsContainer = document.getElementById('filmsContainer');

// Fonction utilitaire pour formater la durée du film en heures et minutes
function formatRuntime(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
}

// Fonction pour charger les détails du film
function loadFilmDetails(filmId) {
    // Utiliser l'ID du film pour récupérer les détails du film depuis l'API
    fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=${maConst}`)
        .then(response => response.json())
        .then(data => {
            // Afficher les détails du film sur la page
            // Vous pouvez mettre à jour le contenu de la page avec les détails du film ici
            console.log(data); // Exemple de traitement des données du film
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du film:', error);
        });
}

// Fonction pour créer et afficher un élément représentant un film
function renderFilm(film) {
    const filmItem = document.createElement('div');
    filmItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

    filmItem.innerHTML = `
        <div class="block-images position-relative">
            <div class="img-box">
                <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="img-fluid" alt="${film.title}" />
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
                    <span class="btn btn-hover iq-button play-now">
                        <i class="fa fa-play mr-1"></i>
                        Play Now
                    </span>
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
    const playNowButton = filmItem.querySelector('.play-now');
    playNowButton.addEventListener('click', () => {
        // Redirection vers la page principale avec l'ID du film en tant que paramètre de requête
        window.location.href = `Details.html?id=${film.id}`;
    });

    // Ajouter l'élément du film au conteneur
    filmsContainer.appendChild(filmItem);
}

// Charger les données des films depuis l'API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Pour chaque film, créer et afficher un élément représentant le film
        data.results.forEach(film => {
            renderFilm(film);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données des films:', error);
    });
