import React from "react";

const SearchResults = ({ result }) => {
  if (results === null) {
    return <p>Which country would you like to find?</p>;
  }

  if (results === undefined) {
    return <p>Too many matches, specify another filter...</p>;
  }

  if (results.props === undefined) {
    return <p>These aren't the droids you're looking for</p>;
  }

  if (results.props.countryData === undefined) {
    return <div id="countryInfo">{results}</div>;
  }

  return (
    <>
      <div>{results}</div>
    </>
  );
};

export default SearchResults;
