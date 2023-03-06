import {Movie, getMovieHTML} from './Movie.js'

const mainEl = document.getElementById("main")
let list = JSON.parse(localStorage.getItem('watchlist'))

function getWatchlistHtml(){
    if (list.length !== 0){
        mainEl.innerHTML = '';
        list = JSON.parse(localStorage.getItem('watchlist'))
        list.map(movie => {
        mainEl.innerHTML += getMovieHTML(movie)
    })
    } else {
        mainEl.innerHTML = `<h3>Your watchlist is looking a little empty...</h3>
        <a href="index.html"><img src="images/Icon\ \(2\).png"/>Let's add some Movies!</a>`
    }
}

document.addEventListener('click', e => {
    if (list.some(movie => movie.uuid === e.target.id)) {
        const movieSafe = list.filter(movie => movie.uuid === e.target.id)
        list = list.filter(movie => movie.Title !== movieSafe[0].Title)
        localStorage.setItem('watchlist', JSON.stringify(list));
        getWatchlistHtml();
    }
})

getWatchlistHtml();
