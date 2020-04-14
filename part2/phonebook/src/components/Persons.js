import React from "react";
const Persons = ({ persons }) => {
  return (
    <>
      <ul>
        {persons.map((person, id) => (
          <li key={id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
