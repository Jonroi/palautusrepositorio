/* eslint-disable react/prop-types */
import '../index.css';

//defines a functional component called Note
const Note = ({ note, toggleImportance, onDelete }) => {
    const label = note.important ? 'Important' : 'Not important';
    return (
        <div className="noteContainer">
            <div className="notecontent">
                <span>{note.content}</span>
            </div>
            <div className="buttons">
                <button className="importance" onClick={toggleImportance}>{label}</button>
                <button className="delete" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Note;