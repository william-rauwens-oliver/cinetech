document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
    const apiFilmURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`;
    const apiSerieURL = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr-FR&page=2`;

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
            const swiperWrapper = document.querySelector(`#${containerId} .swiper-wrapper`);
            data.results.slice(0, maxResults).forEach((item, index) => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${item.title || item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title || item.name}</h5>
                    </div>
                `;
                swiperWrapper.appendChild(slide);
            });
    
            // Initialize Swiper after the slides are added
            const swiper = new Swiper('.swiper-container', {
              slidesPerView: 3,
              spaceBetween: 10,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              breakpoints: {
                600: {
                  slidesPerView: 2,
                },
                900: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 4,
                },
              }
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    }
    fetchCarouselData(apiFilmURL, 'carouselItems', 3);

    fetchData(apiFilmURL, 'liste', 10);
    fetchData(apiSerieURL, 'liste', 10);
});
