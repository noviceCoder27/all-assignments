/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from "axios"


function App() {
  const [todos, setTodos] = useState([]);
  const titleRef = useRef();
  const descriptionRef = useRef();

  
  
  async function postTodo() {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const input = {title,description}
    const response = await axios.post('http://localhost:3000/todos',input);
    const data = await response.data;
    setTodos(prevTodos => [...prevTodos,data]);
  }

  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        <div>
          <span>Title:</span>
          <input type="text" ref={titleRef}/>
          <br />
          <span>Descirption:</span>
          <input type="text" ref={descriptionRef}/> 
        </div>
        <button onClick={postTodo}>Add Todo</button>
        <Todo todos = {todos} setTodos = {setTodos}/>
      </div>
    </>
  )
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    // fetch all todos from server
    useEffect(() => {
      async function fetchodos() {
        try {
          const response = await axios.get('http://localhost:3000/todos');
          const data = await response.data;
          props.setTodos(data);
        } catch(err) {
          console.log("Error fetching todo");
        } 
      }
      fetchodos();
    },[])

    async function deleteTodo(e) {
      const todo = e.target.parentElement;
      const id = todo.id
      try {
        await axios.delete('http://localhost:3000/todos/' + id);
        const oldTodos = props.todos;
        const deletedTodo = oldTodos.find(todo => todo.id === Number(id));
        const index = oldTodos.indexOf(deletedTodo);
        const newTodos = oldTodos.filter((_,i) => i !== index);
        props.setTodos(newTodos);
      } catch(err) {
        console.log("Error deleting todo")
      }
    }

    const todos = props.todos.map(todo => (
      <div key = {todo.id} id = {todo.id}>
        <div>{todo.title}</div>
        <div>{todo.description}</div>
        <button onClick={(e) => deleteTodo(e)}>Delete Todo</button>
      </div>
    ))

    return <>
        {todos}
    </>
}

export default App
