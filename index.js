import {Movie, getMovieHTML, getWatchlist, removeFromWatchlist, safeToLocalStorage} from './utils.js'


let moviesArray = [];
let list = getWatchlist();

const mainEl = document.getElementById("main")
const searchEl = document.getElementById('search-bar')

if (searchEl) {
    searchEl.addEventListener('submit', e => {
        e.preventDefault();
        moviesArray = []
    
        fetch(`https://www.omdbapi.com/?s=${document.getElementById('search-input').value}&apikey=72c0f766`)
            .then(res => res.json())
            .then(data => {
                if(data.Response !== 'False') {
                    data.Search.map(movie => {
                        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=72c0f766`)
                            .then(res => res.json())
                            .then(data => {
                                moviesArray.push(new Movie(data));
                                getSearchHtml();
                            })
                    })
                } else {
                    mainEl.innerHTML = `<h3>Unable to find what you’re looking for.<br/> Please try another search.</h3>`
                }
            })
        document.getElementById('search-input').value = '';
    })
}

function getSearchHtml(){
    mainEl.innerHTML = ''
    moviesArray.map(movie => {
        mainEl.innerHTML += getMovieHTML(movie)
    })
}

document.addEventListener('click', e => {
    if (moviesArray.some(movie => movie.uuid === e.target.id)) {
        const movieSafe = moviesArray.filter(movie => movie.uuid === e.target.id)
        if(list.some(movie => movie.Title === movieSafe[0].Title)) {
            list = removeFromWatchlist(list, movieSafe);
        } else {
            list.push(moviesArray.filter(movie => movie.uuid === e.target.id)[0])
        }
        safeToLocalStorage(list);
        getSearchHtml();
    }
})

