import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider";
import { ScrollToSection } from "./Components/ScrollToSection";
import { ProductsProvider } from "./Context/ProductsContext";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import AppRoutes from "./Components/AppRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <ProductsProvider>
            <ShoppingCartProvider>
              <Routes>
                <Route path="*" element={<AppRoutes />} />
              </Routes>
              <ScrollToSection />
            </ShoppingCartProvider>
          </ProductsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
