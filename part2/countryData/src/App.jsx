import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ShowCountry from './components/ShowCountry'
import Display from './components/Display'


const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const [countries, setCountries] = useState([])

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data
        )
  }

  useEffect(() => {
    getAll()      
    .then(c => {        
      setAllCountries(c) 
      setCountries(c)  
    })  }, [])
  

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value)
    const filtered = allCountries.filter(n => { return n.name.common.toLowerCase().includes(event.target.value.toLowerCase())})
    setCountries(filtered)
  }
  

  return (
    <div>
      <Filter filterInput={filterInput} handleFilterChange={handleFilterChange} />
      <Display countries={countries} setCountries={setCountries} ShowCountry={ShowCountry}/>
    </div>
  )
}

export default App
