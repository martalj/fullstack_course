import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = (country) => {
    const api_key = import.meta.env.VITE_SOME_KEY
      const [weather, setWeather] = useState(null)
      const hook = () => {
        console.log('capital ' + country.capital)

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then(response => {setWeather(response.data)
      })
      }
      useEffect(() => {
        hook()
      }, [])

    
    if (weather){
        const icon = weather.weather[0].icon
    
    return (<div> 
    <h1>{country.flag} {country.name.common}</h1>
    Capital: {country.capital} <br />
    Region: {country.region}<br />
    <h2>Languages</h2>
    <ul>
      {Object.keys(country.languages).map(key => <li key = {key}>{country.languages[key]}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}></img>
    <h2>Weather</h2>
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img> <br />
    Temperature: {weather.main.temp}°C <br />
    Wind: {weather.wind.speed}m/s
    </div>
  )}

else {
    return (<div>   
        <h1>{country.flag} {country.name.common}</h1>
        Capital: {country.capital} <br />
        Region: {country.region}<br />
        <h2>Languages</h2>
        <ul>
          {Object.keys(country.languages).map(key => <li key = {key}>{country.languages[key]}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}></img></div>)
}}

  

export default ShowCountry