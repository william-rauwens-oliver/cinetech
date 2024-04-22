document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '8c4b867188ee47a1d4e40854b27391ec';
  const apiFilmURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=1`;
  const apiSerieURL = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr-FR&page=1`;
  const featuredURL = `https://api.themoviedb.org/3/tv/66732?api_key=${apiKey}&language=fr-FR`; 

  function fetchData(url, containerId, maxResults) {
      fetch(url)
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById(containerId);
          data.results.slice(0, maxResults).forEach(item => {
              const element = document.createElement('div');
              element.className = 'card';
              element.innerHTML = `
                  <img src="https://image.tmdb.org/t/p/w300/${item.poster_path}" alt="${item.title || item.name}">
                  <div class="card-body">
                      <h4>${item.title || item.name}</h4>
                      
                  </div>
              `;
              container.appendChild(element);
          });
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
      });
  }

  // Fetch featured movie
  fetch(featuredURL)
      .then(response => response.json())
      .then(data => {
          document.getElementById('featuredImg').src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
          document.getElementById('featuredTitle').textContent = data.title;
          document.getElementById('featuredInfo').textContent = `${data.release_date.split('-')[0]} | ${data.genres.map(genre => genre.name).join(', ')} | ${data.runtime} min`;
      });

  // Fetch and combine 3 movies and 3 series
  fetchData(apiFilmURL, 'combinedCarousel', 3);
  fetchData(apiSerieURL, 'combinedCarousel', 3);
});

function watchMovie() {
  console.log('Play movie function triggered');
}
