import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "../../../test/About";
import PageContainer from "./PageContainer";
import Login from "../../welcome/components/Login";
import useAxiosConfig from "../../../global/hooks/useAxiosConfig";
import EmployeeProfile from "../../features/employees/components/EmployeeProfile";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../global/redux/hooks";
import { refreshRoutes } from "../reducer/route.slice";
import { ProfileDetailsDTORoleTypeNameEnum } from "../../../openapi";
import { getUserProfile } from "../actions/profile.action";


const OpusRoutes: React.FC = () => {
    useAxiosConfig();
    const { routes } = useAppSelector(state => state.routes);
    const dispatch = useAppDispatch();
    const { roleTypeName } = useAppSelector(state => state.profile.profile);

    useEffect(() => {
        dispatch(refreshRoutes(roleTypeName ?? ProfileDetailsDTORoleTypeNameEnum.Employee))
    }, [dispatch, roleTypeName]);

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<PageContainer />}>
                    {routes.map((route, index) =>
                        <Route key={index} path={route.path} element={route.element} />
                    )}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<EmployeeProfile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default OpusRoutes;