// web dev simplified tutorial
import "./styles.css";
import { useState } from "react";

export default function App(){
  const [newItem, setNewItem] = useState("");
  // setNewItem("Hello World");
  const [todos, setTodos] = useState([]);
  
  // add todo
  function handleSubmit(e){
    e.preventDefault(); //prevents page from refreshing

    //everytime we need to update the current value, 
    // we need to pass it into this function
    setTodos((currentTodos) => {
        return [
          ...currentTodos,
          {id: crypto.randomUUID(), title: newItem, completed: false}
        ]
      }
    )

    // reset the input box 
    setNewItem("");
  }

  //toggle todo checkbox
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return (currentTodos.map(todo => {
          if(todo.id === id){
            return {...todo, completed}
          }

          return todo
        }))
      }
    )
  }

  // delete todo
  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
      }

    )
  }


  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            value={newItem} 
            // value to update the base value
            onChange={ e=> setNewItem(e.target.value)} 
            type="text" 
            id="item"
          />
          <button className="btn">Add Items</button>
        </div>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos!"}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button 
                onClick={ () => deleteTodo(todo.id)} 
              className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}