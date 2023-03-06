import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

class Movie {
    constructor (data) {
        Object.assign(this, data)
        this.uuid = uuidv4();
        this.onWatchlist = false;
    }
}

function getMovieHTML(data) {
    const list = getWatchlist();
    const { Poster, Title, imdbRating, Runtime, Genre, Plot, uuid, onWatchlist } = data;

    let btnStatus = 'add'

    if(list){
        if(list.filter(movie => movie.Title === Title && movie.imdbRating === imdbRating).length > 0) {
            btnStatus = 'remove'
        }
    }
  

    return `
    <div class="movie-cnt">
        <img class="movie-poster" src="${Poster}" alt="movie poster"/>
        <div class="movie-description-cnt">
            <div class="row-1">
                <h2>${Title}</h2>
                <p class="rating">⭐️ ${imdbRating}</p>
            </div>
            <div class="row-2">
                <p class="row2-item">${Runtime}</p>
                <p class="row2-item">${Genre}</p>
                <button id="${uuid}" class="watchlist ${btnStatus}"></button>
                <p class="row2-item">Watchlist</p>
            </div>
            <p class="plot">${Plot}</p>
        </div>
    </div>`
}

function getWatchlist() {
    if(JSON.parse(localStorage.getItem('watchlist')) === null) {
        return []
    } else {
        return JSON.parse(localStorage.getItem('watchlist'))
    }
}

export {Movie, getMovieHTML, getWatchlist};
