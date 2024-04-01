import axios from 'axios'

// eslint-disable-next-line no-undef

//rerouted api_key
const api_key = import.meta.env.VITE_API_KEY;
const getWeather = (latlng) => { //latlng = [latitude, longitude]
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`
    const weather = axios.get(apiURL).then(response => response.data) //promise that returns an object from api
    return weather
}

//gets weather icon from api
const getIcon = (id) => {
    const icon = `https://openweathermap.org/img/wn/${id}@2x.png`
    return icon
}

export default { getWeather, getIcon }