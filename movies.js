
const ax = require('axios');
module.exports = getMovie;



let movieMemory = {};


    
    function getMovie(req, res) {
        let searchQuery = req.query.searchQuery;
        const requestUrl = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1`;
        if (movieMemory[searchQuery] !== undefined) {
            res.send(movieMemory[searchQuery]);
            console.log('from memory');
        }
        else {
            ax
                .get(requestUrl)
                .then(conc => {
                    const movieArr = conc.data.results.map((movieItem, idx) => {
                        return new Movie(movieItem);
                    })
                    movieMemory[searchQuery] = movieArr;
                    console.log('from api');
                    res.send(movieArr)
                })
    
                .catch(err => {
                    res.status(500).send('Sorry an error occured with retrieving searchQuery ' + err)
                })

        }
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

