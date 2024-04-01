import { useEffect, useState } from 'react';
import countryService from './services/countries'
import Finder from './components/finder'
import Countries from './components/country'

import './App.css'

// aplication that allows you to search for countreys, information and weather
const App = () => {
  const [keyword, setKeyword] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => { // fetches all countries
    countryService
      .getAllCountries()
      .then(response => {
        setAllCountries(response)
      })
  }, [])

  const handleOnChange = (event) => { // handles input change
    setKeyword(event.target.value)
  }

  const countriesToShow = keyword.length > 0 ? // filters countries by keyword
    allCountries
      .filter(country => country.name.common.toLowerCase().includes(keyword.toLowerCase())) :
    []

  return ( // renders components
    <div>
      find countries: <Finder keyword={keyword} handleOnChange={handleOnChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App;