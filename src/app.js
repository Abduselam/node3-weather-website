const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, "..")) //"../../.."
const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express config
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Abduselam Mohammed"
    })
})

app.get('/help', (req, res) => {
     res.render('help', {
        title: "Help Page",
        name: "Abduselam Mohammed"
     })
})

app.get('/about', (req, res) => {
     res.render('about', {
        title: "Realtime Weather forecast",
        describe: "Provides real-time weather forecast for a given location",
        name: "Abduselam Mohammed"
     })
})

app.get("/weather", (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must provide and address!"
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return res.send({error})
    }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        errorMessage: "Help article not found",
        name: "Abduselam Mohammed",
        title: "404"
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        errorMessage: "Page not found",
        name: "Abduselam Mohammed",
        title: "404"
    })
})
app.listen(port, () => {
    console.log(`App is runing on port ${port}`)
})