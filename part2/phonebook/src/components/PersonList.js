import React from "react";

const PersonList = ({ name, number }) => {
  return (
    <li id="listItem">
      {name} {number}
    </li>
  );
};

export default PersonList;