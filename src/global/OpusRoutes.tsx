import { Route, Routes } from "react-router-dom"
import Login from "../components/features/login/components/Login";
import Home from "../test/Home";
import About from "../test/About";
import Contact from "../test/Contact";


const OpusRoutes: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default OpusRoutes;