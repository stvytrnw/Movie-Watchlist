let moviesArray = [];

document.getElementById('search-bar').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById("main").innerHTML = ''
    moviesArray = []

    fetch(`http://www.omdbapi.com/?s=${document.getElementById('search-input').value}&apikey=72c0f766`)
        .then(res => res.json())
        .then(data => {
            data.Search.map(movie => {
                fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=72c0f766`)
                    .then(res => res.json())
                    .then(data => {
                        moviesArray.push(data);
                    })
            })
        })

    renderMovies();
    document.getElementById('search-input').value = ''
})

function renderMovies(){
    moviesArray.map(movie => {
        document.getElementById("main").innerHTML += `
        <div class="movie-cnt">
            <img class="movie-poster" src="${movie.Poster}" alt="movie poster"/>
            <div class="movie-description-cnt">
                <h2>${movie.Title}</h2>
            </div>
        </div>`
    })
}