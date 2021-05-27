'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const movies = require('./movies.js');
const weather = require('./weather.js');


const server = express();
server.use(cors());

const PORT = process.env.PORT;


server.get('/', (req, res) => {
    res.status(200).send('Home');
})




server.get('/movies', movies);
server.get('/weather', weather);



server.get('*', (req, res) => {
    res.status(500).send('Bad Request');
})


server.listen(PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
})