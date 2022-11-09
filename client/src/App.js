import logo from "./logo.svg";
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";

function App() {
  useEffect(function () {
    axios.get("https://localhost:5001/api/users").then(function (response) {
      console.log(response.data);
    });
  }, []);
  return <div className="App"></div>;
}

export default App;
