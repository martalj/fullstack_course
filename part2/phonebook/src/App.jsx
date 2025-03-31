import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/persons'

const AddNewEntry = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setUpdateMessage, setErrorMessage}) => {
  const addName = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name == newName)){
      const overwrite = confirm(`${newName} is already added to phonebook, update number to ${newNumber}?`)
      if (overwrite) {
        const entry = persons.find(n => n.name == newName)
        const url = `http://localhost:3001/persons/${entry.id}`
        const changedEntry = {...entry, number: newNumber}
        noteService.update(changedEntry.id, changedEntry).then(response => {
          setPersons(persons.map(n => n.id == entry.id ? response : n))
          setNewName('')
          setNewNumber('')
          setUpdateMessage(`Number for ${newName} has been updated.`)
        })
        .catch(error => {      
          setErrorMessage(        
            `The number for '${newName}' can't be found. It is probably already deleted from the server.`      
          )
          setPersons(persons.filter(p => p.name != newName))})
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
      setUpdateMessage(`${newName} has been added.`)
    })
    .catch(error => {      
      setErrorMessage(        
        `The number for '${newName}' can't be found. It is probably already deleted from the server.`      
      )
      setPersons(persons.filter(p => p.name != newName))})

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

const SingleEntry = ({person, deleter}) => {
  return(
  <div>
    {person.name} {person.number} <button onClick={deleter}>delete</button>
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
  const [updateMessage, setUpdateMessage] = useState(null)
  const [updateError, setErrorMessage] = useState(null)

  
  const Notification = ({ message }) => {
    setTimeout(() => {          
      setUpdateMessage(null)        
    }, 5000)        
  
    if (message === null) {
      return null
    }
    return (
      <div className='updated'>
        {message}
      </div>
    )
  }

  const Error = ({ message }) => {
    setTimeout(() => {          
      setUpdateMessage(null)        
    }, 5000)        
  
    if (message === null) {
      return null
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

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
      noteService.deleteEntry(id).then(response => {
        setPersons(persons.filter(p => p.id != id))
        const p = persons.find(n => n.id == id)
        setUpdateMessage(`${p.name} has been deleted.`)
      })
      .catch(error => { 
        const p = persons.find(n => n.id == id)     
        setErrorMessage(    
          `The number for '${p.name}' can't be found. It is probably already deleted from the server.`     
        )
        setPersons(persons.filter(p => p.id != id))})
    }
  } 
  

  const data = Search()
  const toShow = data !== 1
    ? data
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={updateMessage} />
      <Error message={updateError} />
      <Filter filterInput = {filterInput} setFilterInput = {setFilterInput} />
      <h3>Add number:</h3>
      <AddNewEntry  persons= {persons} setPersons = {setPersons} newName = {newName} setNewName = {setNewName} newNumber = {newNumber} setNewNumber = {setNewNumber} setUpdateMessage={setUpdateMessage} setErrorMessage={setErrorMessage} />
      <h2>Numbers</h2>
    <ul>
    {toShow.map(person =>
      <li key={person.id}>
    <SingleEntry person = {person} deleter={() => deleteEntryOf(person.id)} />
    </li>
    )}
  </ul>
    </div>
    
  )
}

export default App