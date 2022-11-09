import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "./endpoints";

function App() {

  const users = () => {
    axios
    .get(urlUsers)
    .then((response: AxiosResponse<any>) => {
      console.log(response.data);
    });
  }

  
  useEffect(() => {
   users();
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      
    </div>
  );
}

export default App;
