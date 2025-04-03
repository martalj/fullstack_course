const Display = ({countries, setCountries, ShowCountry}) => {
    if (countries.length > 10) {
      return <p> Too many matches, specify your search more. </p>
    }
    else if (countries.length < 10 && countries.length > 1 || countries.length == 0) {
    return countries.map(country => <li key = {country.name.common} >{country.name.common} <button onClick={() => setCountries([country])}>Show</button></li>)}
  
    else {
      console.log(countries)
      return ShowCountry(countries[0])
    }
  }
  
export default Display  