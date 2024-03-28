/* eslint-disable react/prop-types */

//defines a functional component called Note
const Note = ({ note, toggleImportance, onDelete }) => {
    const label = note.important ? 'Important' : 'Not important';
    return (
        <div className="noteContainer">
            <span>{note.content}</span>
            <div>
                <button className="importance" onClick={toggleImportance}>{label}</button>
                <button className="delete" onClick={onDelete}>X</button>
            </div>
        </div>
    );
}

export default Note;