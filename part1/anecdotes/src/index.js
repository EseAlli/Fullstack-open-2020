import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleclick, text }) => {
  return (
    <>
      <button onClick={handleclick}>{text}</button>
    </>
  );
};

// const VoteButton = ({})

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const random = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const vote = () => {
    const copy = [...votes];
    copy[selected]++;

    setVotes(copy);
  };
  console.log(votes);

  const mostVotes = () => {
    const MaxValue = votes.indexOf(Math.max(...votes));
    return MaxValue;
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <Button handleclick={random} text="next anecdote" />
        <Button handleclick={vote} text="vote" />
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotes()]}</div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
