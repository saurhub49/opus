import Route from "../interfaces/route.interface";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import BusinessIcon from '@mui/icons-material/Business';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmployeeHome from "../../components/features/employees/components/EmployeeHome";
import RoleTypes from "../enums/roleTypes.enum";
import About from "../../test/About";
import EmployeeProfile from "../../components/features/employees/components/EmployeeProfile";
import DepartmentsHome from "../../components/features/departments/components/DepartmentsHome";
import RolesHome from "../../components/features/roles/components/RolesHome";
import ClientsHome from "../../components/features/clients/components/ClientsHome";
import RoleBasedAuthorizationConfig from "../../components/features/rbac/components/RoleBasedAuthorizationConfig";
import WelcomeHome from "../../components/welcome/components/WelcomeHome";
import { Icon } from "@mui/material";
import UserProfile from "../../components/features/profile/components/UserProfile";

const allRoleTypes: RoleTypes[] = [RoleTypes.SUPER_ADMIN, RoleTypes.ADMIN, RoleTypes.MANAGER, RoleTypes.EMPLOYEE];

export const routes: Route[] = [
    {
        id: 1,
        label: 'Home',
        path: '/home',
        icon: <HomeIcon />,
        element: WelcomeHome,
        isSidebarElement: true,
        permissions: allRoleTypes
    },
    {
        id: 2,
        label: 'Employees',
        path: '/employees',
        icon: <AccountBoxIcon />,
        element: EmployeeHome,
        isSidebarElement: true,
        permissions: allRoleTypes
    },
    {
        id: 3,
        label: 'About',
        path: '/about',
        icon: <InfoIcon />,
        element: About,
        isSidebarElement: true,
        permissions: allRoleTypes
    },
    {
        id: 4,
        label: 'Contact',
        path: '/contact',
        icon: <CallIcon />,
        element: EmployeeProfile,
        isSidebarElement: true,
        permissions: allRoleTypes
    },
    {
        id: 5,
        label: 'Departments',
        path: '/departments',
        icon: <GroupsIcon />,
        element: DepartmentsHome,
        isSidebarElement: true,
        permissions: [RoleTypes.SUPER_ADMIN, RoleTypes.ADMIN, RoleTypes.MANAGER]
    },
    {
        id: 6,
        label: 'Roles',
        path: '/roles',
        icon: <ManageAccountsIcon />,
        element: RolesHome,
        isSidebarElement: true,
        permissions: [RoleTypes.SUPER_ADMIN, RoleTypes.ADMIN, RoleTypes.MANAGER]
    },
    {
        id: 7,
        label: 'Clients',
        path: '/clients',
        icon: <BusinessIcon />,
        element: ClientsHome,
        isSidebarElement: true,
        permissions: [RoleTypes.SUPER_ADMIN]
    },
    {
        id: 8,
        label: 'Role Type Access',
        path: '/roletypes',
        icon: <VpnKeyIcon />,
        element: RoleBasedAuthorizationConfig,
        isSidebarElement: true,
        permissions: [RoleTypes.SUPER_ADMIN]
    },
    {
        id: 9,
        label: 'Profile',
        path: '/profile',
        icon: <Icon />,
        element: UserProfile,
        isSidebarElement: false,
        permissions: allRoleTypes
    }
]