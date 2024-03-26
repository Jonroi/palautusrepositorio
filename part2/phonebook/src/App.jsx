import { useState } from 'react';
import './App.css';
import FilterForm from './components/FilterForm';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Pertti Pasanen', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} Name already added to phonebook`);
      setNewName('');
      return;
    }
    if (newName === '') {
      alert('Name cannot be empty');
      return;
    }
    else {
      alert(`added ${newName} to phonebook`);
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
    console.log(personObject);
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
      <PersonList persons={persons} filter={filter} />
    </div>
  );
};

export default App;
