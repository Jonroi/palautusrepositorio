/* eslint-disable react/prop-types */
import { useState } from 'react'
import Note from './components/Note'

// renders a list of notes based on the toggle, and allows the user to add new notes.
const App = (initialNotes) => {
  const [notes, setNotes] = useState(initialNotes.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  // adds a new note to an array of notes and resets the newNote variable.
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  // handle changes in a note input field.
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  // determine which notes should be displayed based on the value of showAll
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


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
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">ADD</button>
      </form>
    </div>
  )
}

export default App