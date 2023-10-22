import { RouteProps } from "react-router-dom";
import About from "../../../test/About";
import EmployeeHome from "../../features/employees/components/EmployeeHome";

const about: RouteProps = {
    path: `/about`,
    element: <About />
};

const employeeHome: RouteProps = {
    path: `/employees`,
    element: <EmployeeHome />
};

export const employeeRoutes: RouteProps[] = [
    about,
    employeeHome
]

export const managerRoutes: RouteProps[] = [
    about,
    employeeHome
]

export const adminRoutes: RouteProps[] = [
    about,
    employeeHome
]

export const superAdminRoutes: RouteProps[] = [
    about,
    employeeHome
]
