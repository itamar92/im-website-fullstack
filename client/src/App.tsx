import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "./endpoints";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [users, setUsers] = useState([
    {
      id: "",
      userName: "",
    },
  ]);

  useEffect(() => {
    axios.get(urlUsers).then((response: AxiosResponse<any>) => {
      setUsers(response.data);
      //console.log(users);
    });
  }, []);

  console.log(users);

  return (
    <div>
      <Navbar />
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
