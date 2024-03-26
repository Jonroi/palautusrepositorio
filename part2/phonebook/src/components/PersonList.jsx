/* eslint-disable react/prop-types */
const Person = ({ name, number }) => {
    return (
        <li>{name} {number}</li>
    );
};
const PersonList = ({ persons, filter }) => {
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {filteredPersons.map((person, index) =>
                    <Person key={`${person.name}-${index}`} name={person.name} number={person.number} />
                )}
            </ul>
        </div>
    );
};

export default PersonList;
