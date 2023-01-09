import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "./endpoints";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import colorTheme from "./colorTheme";
import { ThemeProvider } from "@emotion/react";
import { UserContextProvider } from "./Context/UserContext";
import Login from "./Components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { AuthProvider } from "./Context/AuthProvider";
import KeepLoggedIn from "./Components/Login/KeepLoggedIn";

function App() {
  return (
    <UserContextProvider>
      <AuthProvider>
        <ThemeProvider theme={colorTheme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </UserContextProvider>
  );
}

export default App;
