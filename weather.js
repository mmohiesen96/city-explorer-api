const ax = require('axios');
module.exports = getWeather;


function getWeather(req, res) {
    let searchQuery = req.query.searchQuery;
    const requestUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}&days=4`;
    ax
        .get(requestUrl)
        .then(conc => {
            const weatherArr = conc.data.data.map(cityItem => {
                return new Forecast(cityItem);
            })
            res.send(weatherArr)
        })

        .catch(err => {
            res.status(500).send('Sorry an error occured  ' + err)
        })
}


class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    }
}
