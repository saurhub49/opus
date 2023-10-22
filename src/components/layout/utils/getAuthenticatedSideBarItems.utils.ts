import SidebarItem from "../interfaces/sidebarItem.interface";
import { superAdminSidebarItems, adminSidebarItems, managerSidebarItems, employeeSidebarItems } from "../constants/sidebar.constants";
import { ProfileDetailsDTORoleTypeNameEnum } from "../../../openapi";

const getAuthenticatedSideBarItems = (authorizationLevel: ProfileDetailsDTORoleTypeNameEnum): SidebarItem[] => {

    switch (authorizationLevel) {
        case ProfileDetailsDTORoleTypeNameEnum.SuperAdmin:
            return superAdminSidebarItems;

        case ProfileDetailsDTORoleTypeNameEnum.Admin:
            return adminSidebarItems;

        case ProfileDetailsDTORoleTypeNameEnum.Manager:
            return managerSidebarItems;

        default:
        case ProfileDetailsDTORoleTypeNameEnum.Employee:
            return employeeSidebarItems;
    }
}

export default getAuthenticatedSideBarItems;