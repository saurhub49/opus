import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "../test/About";
import PageContainer from "../components/layout/components/PageContainer";
import Login from "../components/welcome/components/Login";
import useAxiosConfig from "./hooks/useAxiosConfig";
import EmployeeHome from "../components/features/employees/components/EmployeeHome";
import EmployeeProfile from "../components/features/employees/components/EmployeeProfile";
import ClientsHome from "../components/features/clients/components/ClientsHome";


const OpusRoutes: React.FC = () => {
    useAxiosConfig();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<PageContainer />}>
                    <Route path="/home" element={<EmployeeHome />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<EmployeeProfile />} />
                    <Route path="/clients" element={<ClientsHome />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default OpusRoutes;