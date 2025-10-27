import './App.css'
import { User } from './types/User';
import { useFetch } from './hooks/useFetch'

function App() {

  const {data, error, isLoading} = useFetch<User>('https://randomuser.me/api/');
  
  console.log(data)


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

  if (data)  {
    return (
      <>
        {data.email}
      </>
    )
  }
}

export default App
