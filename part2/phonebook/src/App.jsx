import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

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
      personService.addPerson(newPerson)
        .then((returnedPerson) => {
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setPersons(persons.concat(returnedPerson));
        })
        .catch(error => {
          setError(error.response.data.error)
          setTimeout(() => {
            setError(null)
          }, 3000)
        })
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
            setError(`Information of ${changedPerson.name} has already been removed from server`)
            setTimeout(() => {
              setError(null)
            }, 3000)
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
      <Notification message={message} error={error}/>
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
