import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((item, id) => (
        <Part part={item.name} exercises={item.exercises} key={id} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const exercises_total = parts.reduce(
    (item, exec) => item + exec.exercises,
    0
  );
  return <p>Number of exercises {exercises_total}</p>;
};

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
