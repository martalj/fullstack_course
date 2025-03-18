import { useState } from 'react'

const Button = ({ onClick, text }) => (  
  <button onClick={onClick}>    
    {text}  
    </button>)

const StatisticLine = ({text, value}) => {
return(
    <tr><td>{text}</td><td>{value}</td></tr>
)
}

const Statistics = ({good, neutral, bad}) => {  
  const total = (good+neutral+bad)
  const avg = ((good-bad)/total)
  const perc = (good/total)*100

  if (total == 0) {
    return (
    <div>
  No feedback given </div>
  )
  }

  return(
    <table> 
      <tbody>
    <StatisticLine text = "Good" value = {good} />
    <StatisticLine text = "Neutral" value = {neutral} />
    <StatisticLine text = "Bad" value = {bad} />
    <StatisticLine text = "Average" value = {avg} />
    <StatisticLine text = "Total" value = {total} />
    <StatisticLine text = "Positive" value = {perc + "%"} />
    </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }
  

  return (
    <div>
      <h1>Give feedback:</h1>
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <h1>Statistics</h1>
    <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App