import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

class Movie {
    constructor (data) {
        Object.assign(this, data)
        this.uuid = uuidv4();
        this.onWatchlist = false;
    }
}

function getMovieHTML(data) {
    const list = JSON.parse(localStorage.getItem('watchlist'))
    const { Poster, Title, imdbRating, Runtime, Genre, Plot, uuid, onWatchlist } = data;

    let btnStatus = ''

    if(list.filter(movie => movie.Title === Title).length > 0) {
        btnStatus = 'remove'
    } else {
        btnStatus = 'add'
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

export {Movie, getMovieHTML};
