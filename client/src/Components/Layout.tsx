import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Loader from "./Loader"
import Navbar from "./Navbar/Navbar"

const Layout = () => {
    return (
        <main>
            <Navbar/>
            <Loader/>
            <Outlet />
            <Footer/>
        </main>
    )
}

export default Layout