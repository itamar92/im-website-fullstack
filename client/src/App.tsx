import React, {  useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuthProvider } from "./Context/AuthProvider";
import { ScrollToSection } from "./Components/ScrollToSection";
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
