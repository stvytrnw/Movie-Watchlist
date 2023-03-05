import Movie from './Movie.js'


let moviesArray = [];
let watchlist = JSON.parse(localStorage.getItem('watchlist'));

const mainEl = document.getElementById("main")
const searchEl = document.getElementById('search-bar')

if (searchEl) {
    searchEl.addEventListener('submit', e => {
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
}

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
            document.getElementById(e.target.id).classList.remove('remove')
            document.getElementById(e.target.id).classList.add('add')
            console.log(watchlist)
        } else {
            watchlist.push(moviesArray.filter(movie => movie.uuid === e.target.id)[0])
            watchlist.map(movie => movie.onWatchlist = true)
            document.getElementById(e.target.id).classList.remove('add')
            document.getElementById(e.target.id).classList.add('remove')
            console.log(watchlist)
        }
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
})

