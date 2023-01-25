import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "./endpoints";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { UserContextProvider } from "./Context/UserContext";
import Login from "./Components/Login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import { AuthProvider, useAuthProvider } from "./Context/AuthProvider";
import KeepLoggedIn from "./Components/Login/KeepLoggedIn";
import Products from "./Pages/Products/Products";
import { ScrollToSection } from "./Components/ScrollToSection";
import About from "./Pages/Home/About";
import Contact from "./Pages/Home/Contact";
import { ProductsProvider } from "./Context/ProductsContext";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import AppRoutes from "./Components/AppRoutes";
import Footer from "./Components/Footer";

function App() {
const {setLoggedInUser} = useAuthProvider();

  useEffect(() => {
    // () =>  setLoggedInUser();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <ProductsProvider>
          <ShoppingCartProvider>
            <BrowserRouter>
              <Navbar />
              <AppRoutes />
              <ScrollToSection />
              <Footer/>
            </BrowserRouter>
          </ShoppingCartProvider>
        </ProductsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
