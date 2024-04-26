const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const api = 'https://api.themoviedb.org/3/discover/movie?api_key=' + maConst;

fetch(api)
  .then(response => response.json())
  .then(data => {
    const filmsContainer = document.getElementById('films');

    data.results.forEach(film => {
        const filmElement = document.createElement('div');
        filmElement.innerHTML = `
            <h2>${film.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.title} Poster">
            <p>${film.overview}</p>
        `;
        filmsContainer.appendChild(filmElement);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données:', error);
  });
