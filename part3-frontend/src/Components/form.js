const Form = ({addName, newName, handleChangeName, newNumber, handleChangeNumber}) => (
  <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleChangeName}/>
        </div>
        <div>
          number: <input
              value={newNumber}
              onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
)

export default Form