import React from "react";

const CountryInfo = ({ countryInfo }) => {
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
    </div>
  );
};

export default CountryInfo;