// JavaScript
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const navbar = document.querySelector('.navbar-right');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.trim();
    if (query.length === 0) {
        searchResults.innerHTML = '';
        navbar.classList.remove('search-active'); // Supprime la classe lorsque le champ de recherche est vide
        searchResults.style.display = 'none'; // Masque les résultats lorsque le champ de recherche est vide
        return;
    }

    const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + maConst + '&query='; // Modifier l'URL pour rechercher des films
    
    fetch(searchUrl + query)
        .then(response => response.json())
        .then(data => {
            searchResults.innerHTML = ''; // Effacez le contenu précédent avant d'ajouter de nouveaux résultats.
            data.results.forEach(movie => {
                const moviePosterUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path; // URL de l'affiche du film
                const moviePoster = document.createElement('img');
                moviePoster.src = moviePosterUrl;
                moviePoster.alt = movie.title; // Ajouter le titre du film comme attribut alt de l'image

                // Ajoutez le contenu de moviePoster à l'élément de résultat de recherche dans votre HTML.
                searchResults.appendChild(moviePoster);
            });
            navbar.classList.add('search-active'); // Ajoute la classe lorsque des résultats sont affichés
            searchResults.style.display = 'block'; // Affiche les résultats
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
});

// Styles CSS pour les résultats de recherche
searchResults.style.position = 'absolute'; // Position absolue pour sortir du flux de document
searchResults.style.top = 'calc(130% + 20px)'; // Afficher les résultats juste en dessous de la barre de navigation avec un espace supplémentaire de 20px
searchResults.style.left = '0'; // Aligner les résultats sur la gauche
searchResults.style.width = '100%'; // Largeur à 100% pour occuper toute la largeur de la barre de navigation
// searchResults.style.backgroundColor = '#fff'; // Supprimer cette ligne pour ne pas définir de fond blanc
searchResults.style.borderTop = '1px solid #ccc'; // Ajouter une bordure supérieure pour séparer les résultats de la barre de navigation
searchResults.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'; // Ajouter une ombre pour créer une distinction visuelle
searchResults.style.zIndex = '999'; // Assurez-vous que les résultats de la recherche s'affichent au-dessus du contenu
searchResults.style.display = 'none'; // Masquer les résultats par défaut
searchResults.style.maxHeight = '900px'; // Modifier la hauteur maximale selon vos préférences
searchResults.style.overflowY = 'auto'; // Activer le défilement vertical automatique si nécessaire
