/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'

// Komponentti, joka näyttää painettujen nappien historian
const History = (props) => {
  // Jos painikkeita ei ole painettu, näytetään viesti siitä, miten appia käytetään
  if (props.allClicks.length === 0) {
    return (
      <div>
        press left or right button to start counting.
      </div>
    )
  }

  // Muussa tapauksessa näytetään painettujen nappien historia
  return (<div>
    <div>Total of clicks: {props.allClicks.length}</div>
    <div>Press history: {props.allClicks.join(' ')}</div>
    <div>{megaClicker(props)}</div>
  </div>
  )
}

// himonäppääjien hauskuuttamiseksi
const megaClicker = (props) => {
  if (props.allClicks.length >= 50) {
    return (
      <div><h2>you really like to whack that clicker! </h2>
      </div>
    )

  }
}

// Komponentti yksittäiselle painikkeelle
const Button = ({ handleClick, text }) => (
  <button className='button' onClick={handleClick}>
    {text}
  </button>
)

// Pääsovelluskomponentti
const App = () => {
  // Tilamuuttujat vasemman ja oikean napin painallusten laskemiseen, sekä kaikkien painallusten historiaan
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  // Käsittelijä vasemman napin painallukselle
  const handleLeftClick = () => {
    // Lisätään 'L' historiaan
    setAll(allClicks.concat('L'))
    // Päivitetään vasemman napin laskuri
    const updatedLeft = left + 1
    setLeft(updatedLeft)
  }

  // Käsittelijä oikean napin painallukselle
  const handleRightClick = () => {
    // Lisätään 'R' historiaan
    setAll(allClicks.concat('R'))
    // Päivitetään oikean napin laskuri
    setRight(right + 1)
  }

  // Käsittelijä nollausnapin painallukselle
  const handleResetClick = () => {
    setLeft(0);
    setRight(0);
    setAll([]);
  };

  // Sovelluksen renderöinti
  return (
    <div>
      <div>
        <h2>App is used to make list of pressed buttons.</h2>
        {left}
        <Button handleClick={handleLeftClick} text='Left'></Button>
        <Button handleClick={handleResetClick} resetCount={setLeft} text="Reset" />
        <Button handleClick={handleRightClick} text='Right'></Button>
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

export default App
