import { getMovieHTML, getWatchlist, removeFromWatchlist, safeToLocalStorage } from './utils.js'

const mainEl = document.getElementById("main")
let list = getWatchlist()

function getWatchlistHtml(){
    if (list.length !== 0){
        mainEl.innerHTML = '';
        list = JSON.parse(localStorage.getItem('watchlist'))
        list.map(movie => {
        mainEl.innerHTML += getMovieHTML(movie)
    })
    } else {
        mainEl.innerHTML = `
        <div class="no-content-cnt">
            <h3>Your watchlist is looking a little empty...</h3>
            <a id="link" href="index.html">
                <img id="link" src="images/Icon\ \(2\).png"/>
                <p>Let's add some movies!</p>
            </a>
        </div>`
    }
}

document.addEventListener('click', e => {
    if (list.some(movie => movie.uuid === e.target.id)) {
        const movieSafe = list.filter(movie => movie.uuid === e.target.id)
        list = removeFromWatchlist(list, movieSafe)
        safeToLocalStorage(list);
        getWatchlistHtml();
    }
})

getWatchlistHtml();
