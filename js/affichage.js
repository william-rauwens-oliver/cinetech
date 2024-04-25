const api = "api_key=8c4b867188ee47a1d4e40854b27391ec";
const base_url = "https://api.themoviedb.org/3";
const final_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api + "&language=fr-FR";
const img_url = "https://image.tmdb.org/t/p/original";

const requests = {
  fetchPopular: `${base_url}/discover/movie?certification_country=FR&certification.lte=G&sort_by=popularity.desc&${api}&language=fr-FR`,
  fetchTrending: `${base_url}/trending/all/week?${api}&language=fr-FR`,
  fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213&language=fr-FR`,
};

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function getStars(vote) {
  const starTotal = 5;
  const starPercentage = (vote / 10) * starTotal;
  const starRounded = Math.round(starPercentage * 10) / 10;
  let stars = "<span class='rating-stars'>";
  for (let i = 0; i < starTotal; i++) {
    stars += i < starRounded ? "★" : "☆";
  }
  stars += "</span>";
  return stars;
}


fetch(requests.fetchNetflixOrignals)
.then((res) => res.json())
.then((data) => {
  console.log(data.results);

  const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];
  console.log(setMovie);
  var banner = document.getElementById("banner");
  var banner_title = document.getElementById("banner__title");
  var banner__desc = document.getElementById("banner__description");
  var banner__rate = document.getElementById("banner__rate");
  banner.style.backgroundImage = "url(" + img_url + setMovie.backdrop_path + ")";
  banner__desc.innerText = truncate(setMovie.overview, 150);
  banner_title.innerText = setMovie.name || setMovie.title; // Adaptation pour TV ou films
  banner__rate.innerHTML = getStars(setMovie.vote_average);
})

fetch(requests.fetchPopular)
.then((res) => res.json())
.then((data) => {
  const headrow = document.getElementById("headrow");
  const row = document.createElement("div");
  row.className = "row";
  row.classList.add("popularrow");
  headrow.appendChild(row);
  const title = document.createElement("h2");
  title.className = "row__title";
  title.innerText = "Populaire";
  row.appendChild(title);
  const row_posters = document.createElement("div");
  row_posters.className = "row__posters";
  row.appendChild(row_posters);
  data.results.forEach(movie => {
    const poster = document.createElement("img");
    poster.className = "row__posterLarge";
    var s2 = movie.id;
    poster.id = s2;
    poster.src = img_url + movie.poster_path;
    row_posters.appendChild(poster);
  });
});

fetch(requests.fetchTrending)
.then((res) => res.json())
.then((data) => {
  const headrow = document.getElementById("headrow");
  const row = document.createElement("div");
  row.className = "row";
  headrow.appendChild(row);
  const title = document.createElement("h2");
  title.className = "row__title";
  title.innerText = "Les mieux notés";
  row.appendChild(title);
  const row_posters = document.createElement("div");
  row_posters.className = "row__posters";
  row.appendChild(row_posters);
  data.results.forEach(movie => {
    console.log(movie);
    const poster = document.createElement("img");
    poster.className = "row__posterLarge";
    var s2 = movie.id;
    poster.id = s2;
    poster.src = img_url + movie.poster_path;
    row_posters.appendChild(poster);
  });
});
