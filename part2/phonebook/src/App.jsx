import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/persons'

const AddNewEntry = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name == newName)){
      const overwrite = confirm(`${newName} is already added to phonebook, update number to ${newNumber}?`)
      if (overwrite) {
        const entry = persons.find(n => n.name == newName)
        const url = `http://localhost:3001/persons/${entry.id}`
        const changedEntry = {...entry, number: newNumber}
        axios.put(url, changedEntry).then(response => {
          setPersons(persons.map(n => n.id == entry.id ? response.data : n))
        })
      }
    }
    else{

    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    noteService      
    .create(nameObject)      
    .then(returnedName => {        
      setPersons(persons.concat(returnedName))        
      setNewName('')
      setNewNumber('')     
    })

}}

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
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



const SingleEntry = ({person, deleteEntry}) => {
  return(
  <div>
    {person.name} {person.number} <button onClick={deleteEntry}>delete</button>
    </div>
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
  
  useEffect(() => {
    noteService      
    .getAll()      
    .then(initialNames => {        
      setPersons(initialNames)      
    })  }, [])
    
  const Search = () => {
    if (filterInput === ''){
      return 1
    }
    const filtered = 
    persons.filter(n => { return n.name.toLowerCase().includes(filterInput.toLowerCase())})
    return filtered
  }

  const deleteEntryOf = id => {
    const res = confirm("Wish to delete?")
    if (res) {
      const url = `http://localhost:3001/persons/${id}`
      axios.delete(url).then(response => {
        setPersons(persons.filter(p => p.id != id))
      })
    }
  } 
  

  const data = Search()
  const toShow = data !== 1
    ? data
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterInput = {filterInput} setFilterInput = {setFilterInput} />
      <h3>Add number:</h3>
      <AddNewEntry  persons= {persons} setPersons = {setPersons} newName = {newName} setNewName = {setNewName} newNumber = {newNumber} setNewNumber = {setNewNumber} />
      <h2>Numbers</h2>
    <ul>
    {toShow.map(person =>
      <li key={person.id}>
    <SingleEntry person = {person} deleteEntry={() => deleteEntryOf(person.id)} />
    </li>
    )}
  </ul>
    </div>
    
  )
}

export default App