import Movie from './Movie.js'

let moviesArray = [];

const mainEl = document.getElementById("main")

document.getElementById('search-bar').addEventListener('submit', e => {
    e.preventDefault();
    moviesArray = []

    fetch(`http://www.omdbapi.com/?s=${document.getElementById('search-input').value}&apikey=72c0f766`)
        .then(res => res.json())
        .then(data => {
            data.Search.map(movie => {
                fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=72c0f766`)
                    .then(res => res.json())
                    .then(data => {
                        moviesArray.push(new Movie(data));
                        renderMovies();
                    })
            })
        })
})

function renderMovies(){
    mainEl.innerHTML = ''

    moviesArray.map(movie => {
        mainEl.innerHTML += movie.getMovieHTML()
    })
}

document.addEventListener('click', e => {
    if (moviesArray.filter(movie => movie.uuid === e.target.id)) {
        console.log(e.target.id)
    }
})