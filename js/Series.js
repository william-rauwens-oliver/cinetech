const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = 'https://api.themoviedb.org/3/discover/tv?api_key=' + maConst;
const seriesContainer = document.getElementById('seriesContainer');

function loadSeriesDetails(seriesId) {
    fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${maConst}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données de la série:', error);
        });
}

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
                        <div style="background-color: red; border-radius: 50%; padding: 6px;">
                            <i class="fa fa-heart" style="color: white;"></i>
                        </div>
                    </button>
                    <button class="btn btn-link comment-btn">
                        <div style="background-color: blue; border-radius: 50%; padding: 6px;">
                            <i class="fa fa-comment" style="color: white;"></i>
                        </div>
                    </button>
                </div>
                <div class="comment-section" style="display: none;">
                    <h6 class="comment-title">Comments</h6>
                    <form class="comment-form">
                        <textarea class="form-control" rows="3" placeholder="Enter your comment"></textarea>
                        <button type="submit" class="btn btn-primary mt-2">Submit</button>
                    </form>
                    <ul class="comment-list mt-3"></ul>
                </div>
            </div>
            <div class="block-social-info">
                <ul class="list-inline p-0 m-0 music-play-lists">
                    <!-- Social icons here -->
                </ul>
            </div>
        </div>
    `;

    const playNowButton = seriesItem.querySelector('.play-now');
    playNowButton.addEventListener('click', () => {
        window.location.href = `Details.html?id=${series.id}`;
    });

    const favoriteButton = seriesItem.querySelector('.favorite-btn');
    favoriteButton.addEventListener('click', () => {

        console.log('Ajouter la série avec ID ' + series.id + ' aux favoris.');
        addToFavorites(series.id);
    });

    const commentButton = seriesItem.querySelector('.comment-btn');
    const commentSection = seriesItem.querySelector('.comment-section');
    const commentForm = seriesItem.querySelector('.comment-form');
    const commentList = seriesItem.querySelector('.comment-list');

    commentButton.addEventListener('click', () => {
        if (commentSection.style.display === 'none') {
            commentSection.style.display = 'block';
            loadComments(series.id);
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

            const commentsKey = `comments_${series.id}`;
            const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
            comments.push(commentText);
            localStorage.setItem(commentsKey, JSON.stringify(comments));

            commentInput.value = '';
        }
    });

    seriesContainer.appendChild(seriesItem);
}

function addToFavorites(seriesId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(seriesId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(series => {
            renderSeries(series);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données des séries:', error);
    });
