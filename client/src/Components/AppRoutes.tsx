import { Routes, Route } from "react-router-dom";
import About from "../Pages/Home/About";
import Contact from "../Pages/Home/Contact";
import Products from "../Pages/Products/Products";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound";

function AppRoutes() {
  return (
    <div className="header">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/head" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
