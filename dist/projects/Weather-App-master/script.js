const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if(place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/', {
        method: 'POST', 
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }) .then(res => res.json()).then(data => {
        setWeatherData(data, place.formatted_address)
    })
})

const icon = new Skycons({color: '#222'})
var statusElement = document.querySelector('data-status');
var locationElement = document.querySelector('[data-location]');
var precipitationElement = document.querySelector('[data-precipitation]');
var temperatureElement = document.querySelector('[data-temperature]');
var windElement = document.querySelector('[data-wind]');
icon.set('icon', 'clear-day');
icon.play();

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.summary
    temperatureElement.textContent = data.temperature
    precipitationElement.textContent = `${data.precipProbability * 100}%`
    windElement.textContent = data.windSpeed
    icon.set("icon", data.icon)
    icon.play()
}