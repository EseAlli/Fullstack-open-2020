import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState('')

  const hook = () => {
    personService
    .getAll()
    .then( intialPersons =>{
      setPersons(intialPersons)
    })
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find(p => p.name === newName)
    if (person){
      const changedPerson = {...person, number: newNumber}
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(person.id, changedPerson )
        .then(updatePerson =>{
          setPersons(persons.map(pep=> pep.id !== person.id ? pep : updatePerson))
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`Updated ${person.name}`)
          setTimeout(()=>{
            setSuccessMessage(null)
          }, 5000)
        })
      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      personService
      .create(personObject)
      .then(newPerson=>{
        setPersons(persons.concat(newPerson));
        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(()=>{
            setSuccessMessage(null)
        }, 5000)
      })
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInputChange = (e) => {
    setFilter(e.target.value);
  };

  const deleteUser = (name,id) =>{
    if (window.confirm(`Delete ${name} ?`)){
      personService
      .deleteOne(id)
      .then(()=>{
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error=>{
        setErrorMessage(`Information of ${name} has already been removed from the server`)
        setTimeout(()=>{
            setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const filterPersons = () => {
    if (filter === "") {
      return persons;
    }
    return [...persons].filter(
      (item) => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
      <Filter
        filter={filter}
        handleFilterInputChange={handleFilterInputChange}
        filterPersons={filterPersons()}
      />
      <h2>add new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterPersons={filterPersons} deletePerson={deleteUser}/>
    </div>
  );
};

export default App;
