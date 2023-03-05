import Movie from './Movie.js'


let moviesArray = [];
let watchlist = [];

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
    if (moviesArray.some(movie => movie.uuid === e.target.id)) {
        const movieSafe = moviesArray.filter(movie => movie.uuid === e.target.id)
        if(watchlist.some(movie => movie.Title === movieSafe[0].Title)) {
            watchlist = watchlist.filter(movie => movie.Title !== movieSafe[0].Title)
        } else {
            watchlist.push(moviesArray.filter(movie => movie.uuid === e.target.id)[0])
        }
    }
})

export {watchlist}