import { Routes, Route } from "react-router-dom";
import About from "../Pages/Home/About";
import Contact from "../Pages/Home/Contact";
import Products from "../Pages/Products/Products";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound";
import Checkout from "../Pages/Checkout/Checkout";
import RequiredAuth from "./RequiredAuth";
import Login from "./Login/Login";
import { useAuthProvider } from "../Context/AuthProvider";
import Layout from "./Layout";
import Unauthorized from "../Pages/Unauthorized";
import { MultipleFileUploadField } from "./Uploader/MultipleFileUploadField";
import Admin from "Pages/Admin";

function AppRoutes() {
  const { isLoggedIn } = useAuthProvider();
  return (
    <div className="header">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/head" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login isOpen={!isLoggedIn} />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/*" element={<NotFound />} />
          {/* Protected Routes  */}
          <Route element={<RequiredAuth allowedRoles={["Member","Moderator"]} />}>
          <Route path="/checkout" element={<Checkout />} />
          </Route>
          {/* Protected Routes For Admins  */}
          <Route element={<RequiredAuth allowedRoles={["Admin","Moderator"]} />}>
          <Route path="/add-product" element={<MultipleFileUploadField/>} />
          <Route path="/admin" element={<Admin/>} />

          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
