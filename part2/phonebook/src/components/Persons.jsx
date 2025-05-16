const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons