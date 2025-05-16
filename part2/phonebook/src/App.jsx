import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    let isExist = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (isExist.length === 0) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.add(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    } else {
      let result = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        const changedPerson = { ...isExist[0], number: newNumber };
        personService
          .updatePerson(changedPerson.id, changedPerson)
          .then((updated) => {
            setPersons(
              persons.map((person) =>
                person.id === changedPerson.id ? updated : person
              )
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (person) => {
    let result = confirm(`Delete ${person.name} ?`);
    if (result) {
      personService.deletePerson(person.id).then((response) => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const personsToShow =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} value={search} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
