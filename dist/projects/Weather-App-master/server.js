
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()

}
var DARKSKY_API_KEY = process.env.DARK_API_KEY
var path = require('path')
var axios = require('axios')
var express = require('express')
var app = express()


//static folder
app.use(express.static(path.join(__dirname, '/')));

app.post('/', (req, res) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`
axios({
    url: url,
    responseType: 'json'
}).then(data => res.json(data.data.currently))
//setWeatherData(data, place.formatted_address)
})

const PORT = process.env.Port || 7000;
app.listen(PORT, () => console.log(`Sever started on port ${PORT}`))