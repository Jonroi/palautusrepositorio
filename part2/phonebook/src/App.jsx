import './App.css';
import { useEffect, useState } from 'react';
import personService from './services/persons';
import FilterForm from './components/FilterForm';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('John Johnson');
  const [newNumber, setNewNumber] = useState('use finnish number format (+123-4567890)');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  // handles notification
  const handleNotification = (message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // fetches data
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        handleNotification('Failed to fetch data. Please try again later.');
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

  // handles form submission
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
            handleNotification(`Updated ${newName}'s phone number.`, 'success');
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
            handleNotification('Failed to update person. Please try again.');
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
          handleNotification(`Added ${newName} to phonebook`, 'success');
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error adding person:', error);
          handleNotification('Failed to add person. Please try again.');
        });
    }
    // Delete a person
  };

  const handleDelete = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        handleNotification('Person deleted successfully.', 'success');
      })
      .catch(error => { // Handle error
        console.error('Error deleting person:', error);
        handleNotification('Failed to delete person. Please try again.');
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <div className="content-wrapper">
        <div className="form-wrapper">
          <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
          <PersonForm
            newName={newName}
            newNumber={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
            handleSubmit={handleSubmit}
          />
          {notification && <p className={notification.type}>{notification.message}</p>}
        </div>
        <PersonList persons={persons} filter={filter} onDelete={handleDelete} />
      </div>
    </div>

  );
};

export default App;
