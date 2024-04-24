const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = 'https://api.themoviedb.org/3/discover/tv?api_key=' + maConst;
const filmsContainer = document.getElementById('filmsContainer');

function formatRuntime(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
}
function loadFilmDetails(filmId) {
    fetch(`https://api.themoviedb.org/3/discover/tv/${filmId}?api_key=${maConst}`)
        .then(response => response.json())
        .then(data => {
           
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du film:', error);
        });
}
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

    const playNowButton = filmItem.querySelector('.play-now');
    playNowButton.addEventListener('click', () => {
        window.location.href = `Details.html?id=${film.id}`;
    });

    filmsContainer.appendChild(filmItem);
}

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(film => {
            renderFilm(film);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données des films:', error);
    });
