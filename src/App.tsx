import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFetch } from './hooks/useFetch'
// import { Button } from './components/Button'
// import { Input } from './components/Input'

type Task ={
  value: string
  id: string
}

function App() {
  const [count, setCount] = useState(0)
  // const [name, setName] = useState("")
  const [todo, setTodo] = useState<string>("");
  const [todolist, setTodolist] = useState<Task[]>([]);
  const [onEdit, setOnEdit] = useState<string | undefined>(undefined);
  const [newValue, setNewValue] = useState("");

  const {data, error, isLoading} = useFetch('https://randomuser.me/api/');

  console.log(data)

  useEffect(()=> {
    console.log("Hello World");
    console.log(count);
  },[count]);

  if (isLoading){
    return(
      <div>
        Chargement en cours...
      </div>
    )
  }

  if (error){
    return (<div>
      Une erreur est malencontreusement survenu: {error}
       Ne contacter l'administrateur il est en vacances avec votre argent #ponzi
    </div>)
  }

  //fonction de génération de clé aléatoire
  function generateShortUniqueKey() {
      const array = new Uint8Array(4);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  function handleSubmitButton() {
    setTodolist((prev)=> [... prev, { value: todo, id: generateShortUniqueKey()}]);
    setTodo("");
  }
  const handleDeleteButton = (id: string) => {
    setTodolist((prev) => prev.filter((todo)=>todo.id !== id));
  }
  const handleEditButton = (id : string) => {
    setOnEdit(id)
  }

  const handleSubmitValue = ({id, value}: Task) => {
    setTodolist((prev)=> 
      prev.map((todo)=> (todo.id === id ? {... todo, value} : todo))
    );
    setOnEdit(undefined)
  }
  if (data)  {
    return (
      <>
      {data.results[0].email}
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <>
            <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}/>
            <button onClick={()=>{handleSubmitButton()}}>Valider</button>
            <ul>
              {todolist.map((todo)=> 
                todo.id === onEdit ? (
                <>
                  <input 
                    type="text" 
                    value={newValue}
                    onChange={(e)=>setNewValue(e.target.value)}
                  />
                  <button onClick={()=>handleSubmitValue({id:todo.id, value: newValue})}>Valider</button>
                </>
              ):(
                <li key={todo.id}>
                  {todo.value} 
                  <button onClick={()=>{handleDeleteButton(todo.id)}}>X</button>
                  <button onClick={()=>{handleEditButton(todo.id)}}>Edit</button>
                </li>
              ))}
            </ul>
          </>
        </div>
        <p className="read-the-docs">
          <button onClick={()=> setCount((prev)=> prev + 1)}>+</button>
          Click on the Vite and React logos to learn more
        </p>
      </>
    )
  }
}

export default App
