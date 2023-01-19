
const ShowOutput = ({id, name, number, handleDelete}) => {
  const handleDeleteClicker = () => {
    if (window.confirm('Do you really want to delete this entry?')) {
    handleDelete(id)
  }}
    return (
    <div>
      <p>
        {name} {number} 
        <button onClick={handleDeleteClicker}>Delete</button>
      </p>
    </div>)
  }



const Persons = ({persons, newSearch, handleDelete}) => {
    const personsToShow = (newSearch === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    return(personsToShow.map(name =>
      <ShowOutput key={name.name} id={name.id} name={name.name} number={name.number} handleDelete={handleDelete} />
      ))
}

export default Persons