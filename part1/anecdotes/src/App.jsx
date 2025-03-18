import { useState } from 'react'

const Random = (number) => {
  return Math.floor(Math.random()*(number))
}

const Button = ({ onClick, text }) => (  
  <button onClick={onClick}>    
    {text}  
    </button>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const [random, setRandom] = useState(0)
  const [selected, setSelected] = useState(0)

  const choose = () => {
    setRandom(Random(anecdotes.length))
    setSelected(random)
  }

  const vote = () => {
    const copy = [...votes]
    copy[random] += 1
    setVotes(copy)
  }

  const highest = Math.max(...votes)
  const highestId = votes.findIndex((id) => id == highest)

  return (
    <div>
      <h1>A random anecdote</h1>
      {anecdotes[selected]} <br></br>
      This anecdote has {votes[random]} votes. <br></br>
      <Button onClick={choose} text="Next" />
      <Button onClick={vote} text="Vote" />

      <h1>Anecdote with most votes</h1>
      {anecdotes[highestId]} <br></br>
      This anecdote has {highest} votes.
    </div>
  )
}

export default App