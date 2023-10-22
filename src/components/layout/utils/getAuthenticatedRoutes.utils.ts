import { RouteProps } from "react-router-dom";
import { adminRoutes, employeeRoutes, managerRoutes, superAdminRoutes } from "../constants/routes.constants";
import { ProfileDetailsDTORoleTypeNameEnum } from "../../../openapi";

const getAuthenticatedRoutes = (authorizationLevel: ProfileDetailsDTORoleTypeNameEnum): RouteProps[] => {

    switch (authorizationLevel) {
        case ProfileDetailsDTORoleTypeNameEnum.SuperAdmin:
            return superAdminRoutes;

        case ProfileDetailsDTORoleTypeNameEnum.Admin:
            return adminRoutes;

        case ProfileDetailsDTORoleTypeNameEnum.Manager:
            return managerRoutes;

        case ProfileDetailsDTORoleTypeNameEnum.Employee:
            return employeeRoutes;
    }
}

export default getAuthenticatedRoutes;