import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "./endpoints";

function App() {
  const [users, setUsers] = useState([{
    id:"",
    userName:""
  }]);

  useEffect(() => {
    axios.get(urlUsers).then((response: AxiosResponse<any>) => {
      setUsers(response.data);
      //console.log(users);
    });
  }, []);

  console.log(users);

  return (
    <div className="App">
      <p>Hello</p>
      {users &&
        users.map((user) => (
          <li key={user.id}>
            {user.id} - {user.userName}
          </li>
        ))}
    </div>
  );
}

export default App;
