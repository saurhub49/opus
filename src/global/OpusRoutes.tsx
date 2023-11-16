import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "../test/About";
import PageContainer from "../components/layout/components/PageContainer";
import Login from "../components/welcome/components/Login";
import EmployeeHome from "../components/features/employees/components/EmployeeHome";
import EmployeeProfile from "../components/features/employees/components/EmployeeProfile";
import ClientsHome from "../components/features/clients/components/ClientsHome";
import RoleBasedAuthorizationConfig from "../components/features/rbac/components/RoleBasedAuthorizationConfig";
import RolesHome from "../components/features/roles/components/RolesHome";
import DepartmentsHome from "../components/features/departments/components/DepartmentsHome";


const OpusRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<PageContainer />}>
                    <Route path="/home" element={<EmployeeHome />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<EmployeeProfile />} />
                    <Route path="/departments" element={<DepartmentsHome />} />
                    <Route path="/roles" element={<RolesHome />} />
                    <Route path="/clients" element={<ClientsHome />} />
                    <Route path="/roletypes" element={<RoleBasedAuthorizationConfig />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default OpusRoutes;