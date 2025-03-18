import { useState } from 'react'

const Button = ({ onClick, text }) => (  
  <button onClick={onClick}>    
    {text}  
    </button>)
  

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}> good </button>
      <button onClick={handleNeutralClick}> neutral </button>
      <button onClick={handleBadClick}> bad </button>

      <h1>statistics</h1>
      good: {good}<br></br>
      neutral: {neutral}<br></br>
      bad: {bad}
    </div>
  )
}

export default App