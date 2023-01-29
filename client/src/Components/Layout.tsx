import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar/Navbar"

const Layout = () => {
    return (
        <main>
            <Navbar/>
            <Outlet />
            <Footer/>
        </main>
    )
}

export default Layout