import Navbar from "./Components/Navbar/Navbar";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";
import { ScrollToSection } from "./Components/ScrollToSection";
import { ProductsProvider } from "./Context/ProductsContext";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import AppRoutes from "./Components/AppRoutes";
import Footer from "./Components/Footer";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ProductsProvider>
          <ShoppingCartProvider>
              <Routes>
                <Route path="*" element={<AppRoutes />} />
              </Routes>
              <ScrollToSection />
          </ShoppingCartProvider>
        </ProductsProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
