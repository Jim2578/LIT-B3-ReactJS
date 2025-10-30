import './App.css'
import { type User } from './types/User';
import { type ApiUserResponse } from './types/User';
import { useFetch } from './hooks/useFetch';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const [users, setUsers] = useState<User[]>();
  const [more, setMore] = useState<string | undefined>(undefined);

  const {data, error, isLoading} = useFetch<ApiUserResponse>('https://randomuser.me/api/?results=20');
  
  useEffect(() => {
    if (data?.results) {
      setUsers(data.results);
    }
  }, [data]);

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
  }</div>
)}}

export default App