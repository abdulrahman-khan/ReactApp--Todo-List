import { useState } from "react";

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("")
    // setNewItem("Hello World");

    // on form submit
    function handleSubmit(e){
        e.preventDefault(); //prevents page from refreshing
        if(newItem === "") return //return if field is null
        onSubmit(newItem)
        setNewItem(""); 
    }
        
    return (    
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
    )
}