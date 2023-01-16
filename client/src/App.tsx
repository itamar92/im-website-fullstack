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
import Products from "./Pages/Products/Products";
import { ScrollToSection } from "./Components/ScrollToSection";
import About from "./Pages/Home/About";
import Contact from "./Pages/Home/Contact";

function App() {
  return (
    
      <AuthProvider>
        <ThemeProvider theme={colorTheme}>
          
          <Navbar />
          <ScrollToSection/>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Routes>
       
        </ThemeProvider>
      </AuthProvider>
    
  );
}

export default App;
