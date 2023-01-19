import { useEffect, useState } from "react";
import Filter from './Components/filter'
import Form from './Components/form'
import Persons from './Components/display'
import noteService from './services/persons';
import Notification from './Components/notification'
import Error from './Components/error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [newError, setNewError] = useState('')



  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name === newName);
    if (person) {
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace the number?`)) {
        const neObject = {name: newName, number: newNumber, id: newName }
        noteService
          .update(newName, neObject)
          .then(() => {
            setPersons(persons.map(person => person.id !== newName ? person: neObject))
            setNewName('')
            setNewNumber('')
            setNewMessage(`Updated ${newName}`)
            setTimeout(() => {
              setNewMessage('')
             }, 5000)
          })
          .catch(error => {
            setNewError(`Information of ${newName}  has already been removed from the server`)
            setTimeout(() => {
              setNewError('')
            }, 5000)
          })

      }
      return
    }


    const nameObject = {
      name: newName,
      number: newNumber,
      id: newName
    }
    noteService
      .create(nameObject)
      .then (() => {
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
        setNewMessage(`Added ${nameObject.name}`)
        setTimeout(() => {
          setNewMessage('')
        }, 5000)
      
      })

          
    }
  
  const handleDelete = (id) => {
    noteService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }
  
  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Error error={newError} />
      <Filter name={newSearch} handle={handleSearch} />
      <h2>add new</h2>
      <Form addName={addName} newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} handleChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} handleDelete={handleDelete}/>
    </div>
  )
  }
export default App;
