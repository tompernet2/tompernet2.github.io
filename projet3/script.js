// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const menubox = document.getElementById('Menucontainer');
const trie = document.getElementById("optionsselect");
trie.addEventListener("change",displayHomePageMovies);
let bouliste = false;
let nb = 0;
// Modifier la fonction loadMovies pour qu'elle retourne les données des films chargés
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response == "True") return data.Search; // Retourner les données des films
    return []; // Retourner un tableau vide si la réponse n'est pas "True"
}

// Modifier la fonction displayHomePageMovies pour utiliser les données des films chargés
async function displayHomePageMovies() {   
    const homeMovies = await loadMovies("Batman"); // Charger une liste de films Thor par défaut
    if(homeMovies.length > 0) { // Vérifier s'il y a des films à afficher
         displayMovieList(homeMovies); // Afficher la liste de films sur la page d'accueil
    } else {
         console.log("Aucun film trouvé pour la page d'accueil."); // Afficher un message s'il n'y a aucun film
    }

}

// Appeler la fonction displayHomePageMovies lorsque la page est chargée
window.addEventListener('load', displayHomePageMovies);


// load movies from API
async function loadMovies(searchTerm){
    if (trie.value == "Date" ) {
        const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
        const res = await fetch(`${URL}`);
        const data = await res.json();
        // console.log(data.Search);
        if(data.Response == "True") {
            const sortedmovie = data.Search.sort((a, b) => new Date(b.Year) - new Date(a.Year));
            displayMovieList(sortedmovie);
        }
    }
    else {
        const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
        const res = await fetch(`${URL}`);
        const data = await res.json();
        // console.log(data.Search);
        if(data.Response == "True") displayMovieList(data.Search);
    }
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list'); // affichage = enable
        loadMovies(searchTerm); // Va chercher les nouvelles données de la recherche
    }
}


function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div'); // Pour chaque film
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    resultGrid.innerHTML = "";
    loadMovieDetails();
}


function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    nb++;
    resultGrid.innerHTML = `
    <div class= "rectangle">
        <div class = "tout">
            <div class = "movie-poster">
                <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
            </div>

            <div class = "movie-info">
                <h3 class = "movie-title">${details.Title}</h3>
                <ul class = "movie-misc-info" >
                    <li class = "year">Year : ${details.Year}</li>
                    <li class = "rated">Ratings : ${details.Rated}</li>
                    <li class = "released">Released : ${details.Released}</li>
                </ul>
                <p class = "genre"><b>Genre :</b> ${details.Genre}</p>
                <p class = "writer"><b>Writer :</b> ${details.Writer}</p>
                <p class = "actors"><b>Actors : </b>${details.Actors}</p>
                <p class = "language"><b>Language :</b> ${details.Language}</p>
            </div>
        </div>
        <div class = "info">
            <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
            <p class = "plot"><b>Plot :</b> ${details.Plot}</p>
        </div>
    </div>
    `;
}

window.addEventListener('click', (event) => {
    if(event.target.className == "form-control"){
        if (nb == 0) {
            console.log("noir chauve");
            resultGrid.classList.add('hide-search-list');
        }
    }
   
});




