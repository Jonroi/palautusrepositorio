/* eslint-disable react/prop-types */
const Person = ({ name, number, onDelete }) => {
    return (
        <div>
            {name} {number}
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

const PersonList = ({ persons, filter = '', onDelete }) => {
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {filteredPersons.map((person, index) =>
                    <Person key={`${person.name}-${index}`} name={person.name} number={person.number}
                        onDelete={() => onDelete(person.id)} />

                )}
            </ul>
        </div>
    );
};

export default PersonList;
