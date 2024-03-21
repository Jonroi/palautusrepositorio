/* eslint-disable react/prop-types */ // Poistaa eslint-varoitukset prop-tyyppien validoinnista

import { useState } from 'react'
import './App.css'

const App = () => {
  // Tilamuuttuja 'counter' ja sen päivitysfunktio 'setCounter' alustetaan 0:lla
  const [counter, setCounter] = useState(0)

  // Konsoliin tulostetaan laskurin arvo joka renderöinnin yhteydessä
  console.log('rendering with counter value', counter)

  // Funktio lisää laskurin arvoa yhdellä
  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  // Funktio vähentää laskurin arvoa yhdellä
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  // Funktio nollaa laskurin arvon
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  // Renderöi laskurin arvon
  const Display = ({ counter }) => <div>{counter}</div>

  // Renderöi painikkeen ja kutsuu sille annettua handleClick-funktiota klikkauksen yhteydessä
  const Button = ({ handleClick, text }) => {
    return (
      <button onClick={handleClick}>
        {text}
      </button>
    )
  }

  // Klikkauskäsittelijä, joka tulostaa 'clicked' konsoliin
  const handleClick = () => {
    console.log('clicked')
  }

  // Konsoliin tulostetaan 'rendering...' sekä laskurin arvo että handleClick-funktio
  console.log('rendering...', counter, handleClick)

  // Palautetaan JSX, joka renderöi Display-komponentin sekä kolme Button-komponenttia, joilla jokaisella on oma toimintonsa
  return (
    <div>
      <Display counter={counter} /> {/* Renderöi laskurin arvon */}
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
    </div>
  )
}

export default App // Viedään App-komponentti käytettäväksi
