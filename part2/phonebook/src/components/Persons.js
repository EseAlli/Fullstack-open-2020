import React from "react";
const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      <ul>
        {persons.map((person, id) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={()=>deletePerson(person.name, person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
