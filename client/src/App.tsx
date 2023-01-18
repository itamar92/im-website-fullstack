import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "./endpoints";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import theme from "./theme";
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
import { ProductsProvider } from "./Context/ProductsContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <ProductsProvider>
          <Navbar />
          <ScrollToSection />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Routes>
        </ProductsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
