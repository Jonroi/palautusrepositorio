import './App.css';
import { useEffect, useState } from 'react';
import personService from './services/persons';
import FilterForm from './components/FilterForm';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`);
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            window.confirm(`Updated ${newName}'s phone number.`);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
            alert('Failed to update person. Please try again.');
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService // Add a new person
        .create(personObject)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson]); // Update the list of persons
          window.confirm(`Added ${newName} to phonebook`);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error adding person:', error);
          alert('Failed to add person. Please try again.');
        });
    }
    // Delete a person
  }; const handleDelete = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        window.confirm('Person deleted successfully.');
      })
      .catch(error => { // Handle error
        console.error('Error deleting person:', error);
        alert('Failed to delete person. Please try again.');
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <PersonList persons={persons} filter={filter} onDelete={handleDelete} />
    </div>
  );
};

export default App;
