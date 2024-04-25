const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const navbar = document.querySelector('.navbar-right');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.trim();
    if (query.length === 0) {
        searchResults.innerHTML = '';
        navbar.classList.remove('search-active');
        searchResults.style.display = 'none';
        return;
    }

    const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + maConst + '&query=';
    
    fetch(searchUrl + query)
        .then(response => response.json())
        .then(data => {
            searchResults.innerHTML = '';
            data.results.forEach(movie => {
                const moviePosterUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
                const moviePoster = document.createElement('img');
                moviePoster.src = moviePosterUrl;
                moviePoster.alt = movie.title;
                searchResults.appendChild(moviePoster);
            });
            navbar.classList.add('search-active');
            searchResults.style.display = 'block';
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
});

searchResults.style.position = 'absolute';
searchResults.style.top = 'calc(130% + 20px)';
searchResults.style.left = '0';
searchResults.style.width = '100%';
searchResults.style.borderTop = '1px solid #ccc';
searchResults.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
searchResults.style.zIndex = '999'; 
searchResults.style.display = 'none';
searchResults.style.maxHeight = '900px';
searchResults.style.overflowY = 'auto';