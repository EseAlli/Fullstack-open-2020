import React from "react";
const Filter = ({
  filter,
  handleFilterInputChange,
  filterPersons,
  persons,
}) => {
  const Filtered = filterPersons.map((person, id) => (
    <li key={id}>
      {person.name} {person.number}
    </li>
  ));
  return (
    <>
      <form>
        <div>
          filter shown with{" "}
          <input value={filter} onChange={handleFilterInputChange} />
          <ul>{Filtered}</ul>
        </div>
      </form>
    </>
  );
};

export default Filter;
