
/* eslint-disable react/prop-types */
const Names = ({ persons }) => {
    return (
        <div>
            {persons.map(person => (
                <div key={person.id}>
                    {person.person} {person.number}
                </div>
            ))}
        </div>
    );
};

const Content = ({ persons }) => {
    return (
        <div>
            {persons.map(person => (
                <div key={person.id}>
                    {person.person} {person.number}
                </div>
            ))}
        </div>
    );
};

export default Names;