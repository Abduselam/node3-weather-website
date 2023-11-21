const request = require('request')

//const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/starkville%3FGeorgia.json?access_token=pk.eyJ1IjoiaWJhZHVyZWhtYW4iLCJhIjoiY2xwMnExeGZiMHF2eDJob2JsY3hseXBzdiJ9.yaQohq8AI7ifJAAcx68LcQ"

// request({url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log("unable to find location, Please check your internet connection")
//     } else if (response.body.features[0].length === 0) {
//         console.log("unable to find location, please try another search!")
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         const location = response.body.features[0].place_name
//         console.log("Data", {"Latitude": latitude, "longitude": longitude, "Data": location})
//     }
// })

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaWJhZHVyZWhtYW4iLCJhIjoiY2xwMnExeGZiMHF2eDJob2JsY3hseXBzdiJ9.yaQohq8AI7ifJAAcx68LcQ"
    request({url, json: true}, (error, {body}) => {
      if (error){
        callback ("Unable to find location, check you connection!", undefined) 
    } else if (body.features.length === 0){
        callback("unable to find location, please try another search!", undefined)
    } else {
        const data = {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        } 
        callback(undefined, data)
    }
        
    })   
}

module.exports = geocode