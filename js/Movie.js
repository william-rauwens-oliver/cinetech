const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + maConst + "&language=fr-FR";
const moviesContainer = document.getElementById('moviesContainer');

function loadMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${maConst}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données du film:', error);
        });
}

function renderMovie(movie) {
    const movieItem = document.createElement('div');
    movieItem.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

    movieItem.innerHTML = `
        <div class="block-images position-relative">
            <div class="img-box">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid" alt="${movie.title}" />
            </div>
            <div class="block-description">
                <h6 class="iq-title">
                    <a href="#">${movie.title}</a>
                </h6>
                <div class="movie-time d-flex align-items-center my-2">
                    <div class="badge badge-secondary p-1 mr-2">${movie.adult ? '18+' : 'Tous âges'}</div>
                    <span class="text-white">${movie.runtime ? formatRuntime(movie.runtime) : 'N/A'}</span>
                </div>
                <div class="hover-buttons">
                    <span class="btn btn-hover iq-button play-now">
                        <i class="fa fa-play mr-1"></i>
                        Voir les détails
                    </span>
                    <button class="btn btn-link favorite-btn" data-id="${movie.id}">
                        <div style="background-color: red; border-radius: 50%; padding: 6px;">
                            <i class="fa fa-heart" style="color: white;"></i>
                        </div>
                    </button>
                    <button class="btn btn-link comment-btn" data-movie-id="${movie.id}">
                        <div style="background-color: blue; border-radius: 50%; padding: 6px;">
                            <i class="fa fa-comment" style="color: white;"></i>
                        </div>
                    </button>
                </div>
                <div class="comment-section" style="display: none;">
                    <h6 class="comment-title">Commentaires</h6>
                    <form class="comment-form">
                        <textarea class="form-control" rows="3" placeholder="Saisissez votre commentaire"></textarea>
                        <button type="submit" class="btn btn-primary mt-2">Soumettre</button>
                    </form>
                    <ul class="comment-list mt-3" data-movie-id="${movie.id}"></ul>
                </div>
            </div>
            <div class="block-social-info">
                <ul class="list-inline p-0 m-0 music-play-lists">
                    <!-- Icônes sociales ici -->
                </ul>
            </div>
        </div>
    `;

    const playNowButton = movieItem.querySelector('.play-now');
    playNowButton.addEventListener('click', () => {
        window.location.href = `Details.html?id=${movie.id}`;
    });

    const favoriteButton = movieItem.querySelector('.favorite-btn');
    favoriteButton.addEventListener('click', () => {
        console.log('Ajouter le film avec ID ' + movie.id + ' aux favoris.');
        addToFavorites(movie.id);
    });

    const commentButton = movieItem.querySelector('.comment-btn');
    const commentSection = movieItem.querySelector('.comment-section');
    const commentForm = movieItem.querySelector('.comment-form');
    const commentList = movieItem.querySelector('.comment-list');

    commentButton.addEventListener('click', () => {
        if (commentSection.style.display === 'none') {
            commentSection.style.display = 'block';
            loadComments(movie.id);
        } else {
            commentSection.style.display = 'none';
        }
    });

    commentForm.addEventListener('submit', event => {
        event.preventDefault();

        const commentInput = commentForm.querySelector('textarea');
        const commentText = commentInput.value.trim();

        if (commentText !== '') {
            const commentItem = document.createElement('li');
            commentItem.classList.add('comment-item');
            commentItem.textContent = commentText;
            commentList.appendChild(commentItem);

            const commentsKey = `comments_${movie.id}`;
            const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
            comments.push(commentText);
            localStorage.setItem(commentsKey, JSON.stringify(comments));

            commentInput.value = '';
        }
    });

    moviesContainer.appendChild(movieItem);
}

function addToFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadComments(movieId) {
    const commentsKey = `comments_${movieId}`;
    const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];

    const commentList = document.querySelector(`.comment-list[data-movie-id="${movieId}"]`);
    commentList.innerHTML = '';

    comments.forEach(commentText => {
        const commentItem = document.createElement('li');
        commentItem.classList.add('comment-item');
        commentItem.textContent = commentText;
        commentList.appendChild(commentItem);
    });
}

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(movie => {
            renderMovie(movie);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données des films:', error);
    });
