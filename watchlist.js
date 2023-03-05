import Movie from './Movie.js'

const mainEl = document.getElementById("main")

const list = JSON.parse(localStorage.getItem('watchlist'))

console.log(list)

function getWatchlistHtml(){
    list.map(movie => {
        const getMovie = new Movie(movie)
        mainEl.innerHTML += getMovie.getMovieHTML()
        console.log(list)
    })
}

document.addEventListener('click', e => {
    if (list.some(movie => movie.uuid === e.target.id)) {
        const movieSafe = list.filter(movie => movie.uuid === e.target.id)
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

getWatchlistHtml();
