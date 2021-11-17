import React, {useState, useEffect} from "react";
import axios from "axios";

const CountryInfo = ({ countryInfo }) => {
  const [weatherInfo, setWeatherInfo] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: countryInfo.capital
    }
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const {current} = response.data;
        setWeatherInfo(current)
      })
  }, [countryInfo.capital])
  
  const {temperature, weather_icons, wind_speed, wind_dir} = weatherInfo
  return (
    <div>
      <h2>{countryInfo.name}</h2>
      <p>capital {countryInfo.capital}</p>
      <p>population {countryInfo.population}</p>
      <h4>Languages:</h4>
      <ul>
        {countryInfo.languages.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <img src={countryInfo.flag} className="flag" alt="flag" />
      <h2>Weather in{countryInfo.name}</h2>
            <p>temperature: {temperature} Celcius</p>
            <img src={weather_icons} alt="Weather Icon"/>
            <p>wind : {wind_speed} mph direction {wind_dir} </p>
    </div>
  );
};

export default CountryInfo;