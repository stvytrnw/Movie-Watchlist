let moviesArray = [];

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
                        moviesArray.push(data);
                        renderMovies();
                        console.log(data)
                    })
            })
        })
})

function renderMovies(){
    document.getElementById("main").innerHTML = ''

    moviesArray.map(movie => {
        document.getElementById("main").innerHTML += `
        <div class="movie-cnt">
            <img class="movie-poster" src="${movie.Poster}" alt="movie poster"/>
            <div class="movie-description-cnt">
                <h2>${movie.Title}</h2>
                <p class="rating">${movie.imdbRating}</p>
                <div class="details-row">
                    <p class="runtime">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <button id="add-watchlist" class="watchlist add"></button>
                </div>
                <p class="plot">${movie.Plot}</p>
            </div>
        </div>`
    })
}