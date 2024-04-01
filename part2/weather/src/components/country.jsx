/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import weatherservice from '../services/weathers'


const CountryInfo = ({ country }) => { // weather info for each country
    const [weather, setWeather] = useState({
        temperature: null,
        wind: null,
        icon: null
    })

    useEffect(() => { // fetches weather data
        const fetchWeather = async () => {
            try {
                const response = await weatherservice.getWeather(country.latlng)
                setWeather({
                    temperature: response.main.temp,
                    wind: response.wind.speed,
                    icon: weatherservice.getIcon(response.weather[0].icon)
                })
            } catch (error) {
                console.error('Error fetching weather data:', error)
            }
        }

        fetchWeather()
    }, [country.latlng]) // adds country.latlng as dependency

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                capital: {country.capital} <br />
                area: {country.area}
            </div>
            <div>
                <strong>languages:</strong>
                <ul>

                    {Object.entries(country.languages).map(([key, value]) => (
                        <li key={key}>{value}</li>
                    ))}
                </ul>
            </div>
            <img src={country.flags.png} alt={country.flags.alt} />
            <div>
                <h2>Weather in {country.capital}</h2>
                temperature {weather.temperature} ℃<br />
                <br />
                wind {weather.wind} m/s
                <br />
                <img src={weather.icon} alt='weather icon' />
            </div>
        </div>
    )
}

// renders country list and country info
const Countries = ({ countries }) => {
    if (countries.length > 10) {// too many matches
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countries.length === 1) { // one match
        const country = countries[0]
        return (
            <div>
                <CountryInfo key={country.cca3} country={country} />
            </div>
        )
    } else {
        return (// multiple matches
            <div>
                {countries.map(country =>
                    <div key={country.cca3}>{country.name.common}</div>
                )}
            </div>
        )
    }
}

export default Countries
