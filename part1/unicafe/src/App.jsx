import { useState } from 'react';
import PropTypes from 'prop-types';

import './App.css';


// Komponentti yksinkertaiselle painikkeelle
const Button = ({ handleClick, text }) => (
  <button className='button' onClick={handleClick}>
    {text}
  </button>
);

// Prop-tyypit Button-komponentille
Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// Komponentti yksittäiselle tilastoriville
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

// Prop-tyypit StatisticLine-komponentille
StatisticLine.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// Funktio keskiarvon laskemiseen
const calculateAverage = (good, bad, neutral) => {
  const sum = good + bad + neutral;
  const average = sum === 0 ? 0 : (good - bad) / sum;
  return average.toFixed(1); // Palautetaan keskiarvo yhden desimaalin tarkkuudella
};

// Funktio positiivisten palautteiden prosenttiosuuden laskemiseen
const calculatePositive = (good, all) => {
  const positivePercentage = all.length === 0 ? 0 : (good / all.length) * 100;
  return positivePercentage.toFixed(1) + '%'; // Palautetaan positiivinen prosenttiosuus yhden desimaalin tarkkuudella
};

// Komponentti tilastoille
const Statistics = ({ good, neutral, bad, allClicks }) => (
  <tbody>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="All" value={allClicks.length} />
    <StatisticLine text="Positive" value={calculatePositive(good, allClicks)} />
    <StatisticLine text="Average" value={calculateAverage(good, bad, neutral)} />
  </tbody>
);

// Prop-tyypit Statistics-komponentille
Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
  allClicks: PropTypes.array.isRequired,
};

// Pääkomponentti
const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [allClicks, setAll] = useState([]);

  // Käsittelijäfunktiot palautteiden napauttamiseen ja nollaukseen
  const handleGoodClick = () => {
    setAll(allClicks.concat('good'));
    setGood(good + 1);
  };

  const handleBadClick = () => {
    setAll(allClicks.concat('bad'));
    setBad(bad + 1);
  };

  const handleNeutralClick = () => {
    setAll(allClicks.concat('neutral'));
    setNeutral(neutral + 1);
  };

  // Nollataan palautteet
  const handleResetClick = () => {
    setGood(0);
    setBad(0);
    setNeutral(0);
    setAll([]);
  };

  // Käyttöliittymä, joka koostuu painikkeista ja tilastoista
  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleBadClick} text='Bad' />
        <Button handleClick={handleNeutralClick} text='Neutral' />
        <h2>Statistics</h2>

        <table className='tableStat'>
          <tbody>
            {allClicks.length === 0 && ( // Ehtolauseke tarkistaa, onko klikkauksia
              <tr>
                <td colSpan="2">
                  <h3 className='first'>First feedback starts Statistics.</h3>
                </td>
              </tr>
            )}
            <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">
                <Button handleClick={handleResetClick} text="Reset" />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default App;
