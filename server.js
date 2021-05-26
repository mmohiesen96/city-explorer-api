'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ax = require('axios');
const { default: axios } = require('axios');


const server = express();
server.use(cors());

const PORT = process.env.PORT;
const WEATHER_URL = process.env.WEATHER_API_KEY;
const MOVIE_URL = process.env.MOVIE_API_KEY;
server.get('/weather', (req, res) => {
    let searchQuery = req.query.searchQuery;
    const requestUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${WEATHER_URL}`;
    ax
        .get(requestUrl)
        .then(conc => {
            const weatherArr = conc.data.data.map(cityItem => {
                return new foreCast(cityItem);
            })
            res.send(weatherArr)
        })

        .catch(err => {
            res.status(500).send('Sorry an error occured  ' + err)
        })
})
server.get('/movies', (req, res) => {
    let searchQuery = req.query.searchQuery;
    const requestUrl = `http://api.themoviedb.org/3/search/movie?api_key=${MOVIE_URL}&query=${searchQuery}&page=1`;
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
})

server.get('/', (req, res) => {
    res.status(200).send('Home');
})
server.get('*', (req, res) => {
    res.status(500).send('Bad Request');
})
class foreCast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
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
server.listen(PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
})