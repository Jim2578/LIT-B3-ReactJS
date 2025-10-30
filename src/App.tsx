import './App.css'
import { type User } from './types/User';
import { type ApiUserResponse } from './types/User';
import { useFetch } from './hooks/useFetch';
import { useState } from 'react';
import { useEffect } from 'react';
import { useUserContext } from './hooks/useUserContext';
import { ComponentsB } from './components/componentsB';


function App() {
  const [users, setUsers] = useState<User[]>();
  const [more, setMore] = useState<string | undefined>(undefined);
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
;

  const {data, error, isLoading} = useFetch<ApiUserResponse>('https://randomuser.me/api/?results=20');
  
  const {isAdmin, verifyAdmin} = useUserContext()
  
  useEffect(() => {
    if (data?.results) {
      setUsers(data.results);
    }
  }, [data]);

  const handleVerify = () => {
    verifyAdmin(inputFirstName, inputLastName);
  }

  const handleMoreButton = (id:string) => {
    setMore(id);
  }
  const handleLessButton = (id:string) => {
    if (more === id){
      setMore("");
    }
  }

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

  if (users)  {
    return (
      <div>{users.map((user) =>
        user.login.uuid === more ? (
        <>
          <div className='carde' key={user.login.uuid}>
            <img src={user.picture.large} alt="" />
            <p>{user.name.first} {user.name.last}</p>
            <button onClick={()=>{handleLessButton(user.login.uuid)}}>-</button>
            <p>📞 : {user.cell} - 💻 : {user.email}</p>
          </div>
        </>
      ):(
        <>
          <div className='carde'key={user.login.uuid}>
            <img src={user.picture.large} alt="" />
            <p>{user.name.first} {user.name.last}</p>
            <button onClick={()=>{handleMoreButton(user.login.uuid)}}>+</button>
          </div>
        </>
      ),
    )
  }
  <div className=''>
    <span>First Name</span>
    <input type="text" value={inputFirstName} onChange={((e)=>setInputFirstName(e.target.value))} />
    <span>Last Name</span>
    <input type="text" value={inputLastName} onChange={((e)=>setInputLastName(e.target.value))} />
    <button onClick={handleVerify}>
      Verifiy
    </button>
  </div>
  {isAdmin? "app" : "Je suis pas admin"}
  <ComponentsB/>
  </div>
)}}

export default App