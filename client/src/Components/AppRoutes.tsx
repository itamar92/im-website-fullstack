import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "../Pages/Home/About";
import Contact from "../Pages/Home/Contact";
import Products from "../Pages/Products/Products";
import Home from "../Pages/Home/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default AppRoutes;
