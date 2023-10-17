import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../test/Home";
import About from "../test/About";
import Contact from "../test/Contact";
import PageContainer from "../components/layout/components/PageContainer";
import Login from "../components/welcome/components/Login";
import useAxiosConfig from "./hooks/useAxiosConfig";


const OpusRoutes: React.FC = () => {
    useAxiosConfig();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<PageContainer />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default OpusRoutes;