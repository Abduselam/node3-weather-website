const request = require ('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=40d66f0207bf7ec9c809f7514465b6c0&query=${lat},${long}`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to get forecast, please check your internet connection", undefined)
        } else if (body.error) {
            callback("unable to get forecast, please try another search", undefined)
        } else {
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            const weatherDescription = body.current.weather_descriptions[0]

            callback(undefined, `${weatherDescription}. It is currently ${temperature} degrees out, It feels like ${feelsLike} degrees out`)
        }
    })
}

module.exports = forecast
 