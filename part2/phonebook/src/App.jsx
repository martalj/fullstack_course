import { useState, useEffect } from 'react'
import axios from 'axios'

const AddNewEntry = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name == newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{

    const nameObject = {
      name: newName,
      number: newNumber
    }

  setPersons(persons.concat(nameObject))
  setNewName('')
  setNewNumber('')
  console.log(persons)    }

  }

  const handleNameChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}        
           />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)

}

const DisplayNames = ({data, persons}) => {
  
  const toShow = data !== 1
    ? data
    : persons

  return(
    <ul>
    {toShow.map(person =>
    <li key={person.name}>
      {person.name} {person.number}
    </li>
    )}
  </ul>

  )
}

const Filter = ({filterInput, setFilterInput}) => {
  const handleFilterChange = (event) => {
    setFilterInput(event.target.value)
    }
  
  return (
    <div>Search: <input
    value={filterInput} 
    onChange={handleFilterChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const Search = () => {
    if (filterInput === ''){
      return 1
    }
    const filtered = 
    persons.filter(n => { return n.name.toLowerCase().includes(filterInput.toLowerCase())})
    return filtered
  }

  const data = Search()

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterInput = {filterInput} setFilterInput = {setFilterInput} />
      <h3>Add number:</h3>
      <AddNewEntry  persons= {persons} setPersons = {setPersons} newName = {newName} setNewName = {setNewName} newNumber = {newNumber} setNewNumber = {setNewNumber} />
      <h2>Numbers</h2>
      <DisplayNames data = {data} persons = {persons} />
    </div>
    
  )
}

export default App