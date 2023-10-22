import BadgeIcon from '@mui/icons-material/Badge';
import LabelIcon from '@mui/icons-material/Label';
import ClassIcon from '@mui/icons-material/Class';
import SecurityIcon from '@mui/icons-material/Security';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SidebarItem from "../interfaces/sidebarItem.interface";

const employee: SidebarItem = {
    id: 1,
    label: 'Employees',
    path: '/employees',
    icon: <BadgeIcon />
};

const role: SidebarItem = {
    id: 2,
    label: 'Roles',
    path: '/roles',
    icon: <LabelIcon />
};

const department: SidebarItem = {
    id: 3,
    label: 'Departments',
    path: '/departments',
    icon: <ClassIcon />
};

const roleType: SidebarItem = {
    id: 4,
    label: 'Role Types',
    path: '/roleTypes',
    icon: <AdminPanelSettingsIcon />
}

const roleBasedAuthorizationConfiguration: SidebarItem = {
    id: 5,
    label: 'RBAC',
    path: '/rbac',
    icon: <SecurityIcon />
}

export const employeeSidebarItems: SidebarItem[] = [
    employee,
]

export const managerSidebarItems: SidebarItem[] = [
    employee,
    department,
]

export const adminSidebarItems: SidebarItem[] = [
    employee,
    department,
    role,
]

export const superAdminSidebarItems: SidebarItem[] = [
    employee,
    department,
    role,
    roleType,
    roleBasedAuthorizationConfiguration,
]