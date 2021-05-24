'use strict'

const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');

require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.get('/weather', (req, res) => {
    let searchQuery = req.query.searchQuery;
    let lon = '';
    let lat = '';
    let citiesArr = ['amman', 'seattle' , 'paris'];
    if(!citiesArr.includes(searchQuery.toLowerCase())) {
        res.status(500).send('No Such a city');
    }

    else{

        let resultQuery = weatherData.find(item => {
            if (
    
                item.city_name.toLowerCase() === searchQuery
            )
            {
                searchQuery = item.city_name;
                lon = item.lon;
                lat = item.lat;
                return item;
            }
    });
    
    
    let cityArray = resultQuery.data.map(item => {
        return new foreCast(item);
    })
    cityArray.push({lat});
    cityArray.push({lon});
    res.send(cityArray);
        console.log(cityArray);
    }
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
server.listen(PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
})