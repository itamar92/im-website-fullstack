import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "./endpoints";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import colorTheme from "./colorTheme";
import { ThemeProvider } from "@emotion/react";
import { UserContext } from "./Services/UserContext";

function App() {
  const [users, setUsers] = useState([
    {
      id: "",
      userName: "",
    },
  ]);

 // const { details } = useContext(UserContext);

  useEffect(() => {
    axios.get(urlUsers).then((response: AxiosResponse<any>) => {
      setUsers(response.data);
      //console.log(users);
    });
  }, []);

  console.log(users);

  return (
    <div>
      <ThemeProvider theme={colorTheme}>
      <Navbar />
      <Home/>
      <p>Hello</p>
      {users &&
        users.map((user) => (
          <li key={user.id}>
            {user.id} - {user.userName}
          </li>
        ))}
      </ThemeProvider>
    </div>
  );
}

export default App;
