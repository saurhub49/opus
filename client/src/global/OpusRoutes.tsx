import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import PageContainer from "../components/layout/components/PageContainer";
import Login from "../components/welcome/components/Login";
import ConfirmUser from "../components/welcome/components/ConfirmUser";
import React from "react";
import ErrorBoundary from "./error/ErrorBoundary";
import { useAppSelector } from "./redux/hooks";
import RoleTypes from "./enums/roleTypes.enum";
import { routes } from "./constants/routes.constants";
import ForbiddenError from "../components/features/common/components/ForbiddenError";

const OpusRoutes: React.FC = () => {

    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/confirm/:token" element={<ConfirmUser />} />
                    <Route element={<PageContainer />}>
                        {
                            routes.map(route => (
                                <Route key={route.id} path={route.path} element={
                                    <RouteElement
                                        element={route.element}
                                        permissions={route.permissions}
                                    />}
                                />
                            ))
                        }
                        <Route path="*" element={<Navigate to="/home" />} />
                    </Route>
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    )
};

interface RouteElementProps {
    element: React.FC;
    permissions: RoleTypes[];
}

const RouteElement: React.FC<RouteElementProps> = (props): React.ReactElement => {
    const roleType = useAppSelector(state => state.profile.profile?.roleTypeName as RoleTypes);
    const { element, permissions } = props;

    if (!permissions.includes(roleType)) {
        return <ForbiddenError />;
    }

    return React.createElement(element);
}

export default OpusRoutes;