import AnecdoteList from './components/AnecdoteList';
import CreateAnecdote from './components/AnecdoteForm';
import Filter from './components/filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <CreateAnecdote />
    </div>
  )
}

export default App;
