
const ax = require('axios');
module.exports = getMovie; 





function getMovie(req, res) {
    let searchQuery = req.query.searchQuery;
    const requestUrl = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1`;
    ax
        .get(requestUrl)
        .then(conc => {
            const movieArr = conc.data.results.map((movieItem , idx) => {
                return new Movie(movieItem);
            })
            res.send(movieArr)
        })

        .catch(err => {
            res.status(500).send('Sorry an error occured with retrieving movies ' + err)
        })
}


const baseImgUrl = 'https://image.tmdb.org/t/p/w500'
class Movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview
        this.average_votes = movie.vote_average;
        this.total_votes = movie.vote_count;
        this.image_url = baseImgUrl + movie.poster_path;
        this.popularity = movie.popularity;
        this.released_on = movie.release_date;
    }
}

