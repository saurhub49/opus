import { routes } from "../constants/routes.constants";
import RoleTypes from "../enums/roleTypes.enum";
import Route from "../interfaces/route.interface";


export const getSidebarElements = (roleType: RoleTypes = RoleTypes.EMPLOYEE): Route[] => {
    return routes
        .filter(route => route.isSidebarElement)
        .filter(route => route.permissions.includes(roleType));
}