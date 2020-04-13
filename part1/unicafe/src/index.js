import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({text, value})=>(
  <>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  </>
);

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  let average = (good-bad)/all;
  let positive = good/all * 100 + "%";
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <Header />
        <p>no feedback given</p>
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic
          text="average"
          value={average}
        />
        <Statistic
          text="positive"
          value={positive}
        />
        </tbody>
      </table>
    </>
  );
};

const Header = () => {
  return <h1>give feedback</h1>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  return (
    <div>
      <Header />
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
