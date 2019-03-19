const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");
const forecast = require("./forecast");
const geocode = require("./geocode")
const publicDirectory = path.join(__dirname, "../public")

//init express
const app = express();

app.use(express.static(publicDirectory))

//gets a string e.g "/" - the "/" can be an "about" or any other string. the function is  a request and response. 
app.get("/home", (req, res) => {
    
    res.send("loaded.")
    console.log(req.query)
});

app.get("/weather", (req, res) => {
    //requires address in the html bar e.g "?address=Chester"
    if (!req.query.address){
        return res.send("Please search for an address")
    }
    //requires the address yet again to give the geocode location
    geocode(req.query.address, (error, response) => {
        if (error) {
            return console.log(error)
        }
        //requires a latitude and longitude response from geocode and lists the weather report of said location.
        forecast(response.latitude, response.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            //sends the data back to browser 
            res.send({
                forecast: forecastData,
                location: response.location,
                address: req.address
            })
        })
    })
})

// listens for the port number and runs the function.
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});