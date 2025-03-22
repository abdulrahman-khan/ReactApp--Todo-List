// web dev simplified tutorial
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList"
import "./styles.css";
import { useEffect, useState } from "react";

export default function App(){
  // because the state is in App.jsx, all our helper functions for managing state are here
  // pass the functions in as "props" in order to use them in other jsx files
  const [todos, setTodos] = useState(() =>{
    const localValue = localStorage.getItem("ITEM")
    if (localValue==null) return []
    else return JSON.parse(localValue)
  });
  // const [todos, setTodos] = useState([]);

  // use effect hook takes function as argument that runs the function everytime the objects inside the array change
  // everytime the todos array changes, update the json in localstorage 
  useEffect(() => {
    console.log("saved to local storage")
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])
  
  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }
  //toggle todo checkbox
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }
  // Deletes item from todolist
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }


  return (
    <>
      {/* passing prop */}
      <NewTodoForm onSubmit={addTodo}/>

      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}