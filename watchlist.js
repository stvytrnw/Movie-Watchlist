import { watchlist } from "./index.js";

const mainEl = document.getElementById("main")

function getWatchlistHtml(){
    mainEl.innerHTML = ''

    watchlist.map(movie => {
        mainEl.innerHTML += movie.getMovieHTML()
    })
}

getWatchlistHtml();