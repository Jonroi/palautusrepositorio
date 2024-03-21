import { useState } from 'react'
import PropTypes from 'prop-types'
import './App.css'

// Yksinkertainen painike, joka kutsuu määriteltyä käsittelijäfunktiota
const Button = ({ text, onClick }) => (
  <button className="Button" onClick={onClick}>{text}</button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// Esittää yksittäisen anekdootin tekstin ja siihen liittyvän äänimäärän
const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>Has {votes} votes</p>
  </div>
)

Anecdote.propTypes = {
  text: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
}

// Hallitsee tilaa valitun anekdootin ja äänimäärien suhteen
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // Käsittelijäfunktio seuraavan anekdootin näyttämiseen
  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  // Käsittelijäfunktio äänen antamiseen anekdootille
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  // Etsitään eniten ääniä saanut anekdootti
  const mostVotedIndex = votes.indexOf(Math.max(...votes))

  // Palautetaan käyttöliittymä
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text="Next anecdote" onClick={handleNextAnecdote} />
      <Button text="Vote" onClick={handleVote} />
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[mostVotedIndex]} votes={votes[mostVotedIndex]} />
    </div>
  )
}

export default App
