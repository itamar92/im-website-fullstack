import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "./endpoints";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import colorTheme from "./colorTheme";
import { ThemeProvider } from "@emotion/react";
import { UserContext } from "./Services/UserContext";
import Login from "./Components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";

function App() {
  const [users, setUsers] = useState([
    {
      id: 0,
      userName: "",
      email: "",
    },
  ]);

  const userContext = useContext(UserContext);

  useEffect(() => {
    // axios.get(urlUsers).then((response: AxiosResponse<any>) => {
    //   userContext?.setUser(response.data);
    //   setUsers(userContext?.user);
    //   //console.log(users);
    // });
  }, []);

  // console.log(userContext?.user);

  return (
    <ThemeProvider theme={colorTheme}>
      <Navbar/>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
    </Routes>
    </ThemeProvider>
  );
}

export default App;
