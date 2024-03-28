/* eslint-disable react/prop-types */

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) => {
    return (
        <div>
            <h2>Add a new contact</h2>
            <form>
                <div>
                    Add name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    Add number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button onClick={handleSubmit} type="submit">add</button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm;
