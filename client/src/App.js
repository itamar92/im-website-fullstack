import logo from './logo.svg';
import {useEffect} from 'react';
import axios, {AxiosResponse} from 'axios';
import './App.css';

function App() {

  useEffect(() => {
    axios.get('http://localhost:5001//api/users')
    .then(( AxiosResponse  => {
      console.log(response.data);
    }))
  },[]) 
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
