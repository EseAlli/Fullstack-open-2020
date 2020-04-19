import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import SearchResults from "./components/SearchResults";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
      console.log(countries);
    });
  };
  useEffect(hook, []);

  const handleFilterChange = () => {
    setFilter(e.target.value.toLowerCase());
  };

  const showResult = () => {
    let result = <div>Loading...</div>;
    if (countries.length > 0) {
      if (filter === "") {
        return null;
      }
      result = "";
      let filteredArr = countries.filter((item) =>
        item.name.toLowerCase().includes(filter)
      );

      if (filteredArr.length > 10) {
        result = undefined;
      } else if (filteredArr.length === 1) {
        result = <CountryData countryData={filteredArr[0]} />;
      }
    } else if (filteredArr.length > 1 && filteredArr.length < 10) {
      result = (
        <CountryList countries={filteredArr} handleBtnClick={handleBtnClick} />
      );
    }
    return result;
  };

  return (
    <>
      <Filter onFilterChange={handleFilterChange} />
      <SearchResults />
    </>
  );
};

export default App;
