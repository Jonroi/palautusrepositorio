import { useEffect, useState } from "react";
import noteService from './services/notes'
import Note from './components/Note'
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, []);


  //handles the submission of a new note
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  //deletes note from db and page
  const deleteNote = (id) => {
    noteService
      .remove(id)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id))
        console.log('deleted', id)
      })
  }


  // handles importance of a note
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important } //toggles importance based on current value

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(`the note '${error.note}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }


  // handle changes in a note input field.
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  // determine which notes should be displayed based on the value of showAll
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {/* define the button that toggles the value of showAll */}
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/* Map through notes and render each note with a delete and importance button */}
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            onDelete={() => deleteNote(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          id="newNote"
          value={newNote}
          onChange={handleNoteChange} />
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}
export default App;
