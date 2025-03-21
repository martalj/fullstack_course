import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'     }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('newname:', newName)
    console.log('persons: ', persons)
    if (persons.some(e => e.name == newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{

    const nameObject = {
      name: newName
    }

  setPersons(persons.concat(nameObject))
  setNewName('')
  console.log(persons)    }

  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNoteChange}        
           />
        </div>
        <div>
          number: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
        <li key={person.name}>
          {person.name}
        </li>
        )}
      </ul>


    </div>
    
  )
}

export default App