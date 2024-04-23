document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
    const apiFilmURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`;
    const apiSerieURL = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr-FR&page=1`;

    function fetchCarouselData(url, containerId, maxResults) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            data.results.slice(0, maxResults).forEach((item, index) => {
                const element = document.createElement('div');
                element.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                element.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/original/${item.poster_path}" class="d-block w-100" alt="${item.title}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${item.title}</h5>
                        <p>Genre: ${item.genre_id}</p>
                        <p>Note: ${item.vote_average} / 10</p>
                    </div>
                `;
                container.appendChild(element);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    }
    
    
    function fetchData(url, containerId, maxResults, isSeries = false) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            data.results.slice(0, maxResults).forEach((item, index) => {
                const element = document.createElement('div');
                element.className = 'card';
                element.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title || item.name}</h5>
                    </div>
                `;
                container.appendChild(element);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    }

    // Fetch and display 3 featured movies in the carousel
    fetchCarouselData(apiFilmURL, 'carouselItems', 3);

    // Fetch and display 3 movies and 3 series in 'liste'
    fetchData(apiFilmURL, 'liste', 4);
    fetchData(apiSerieURL, 'liste', 4);
});
