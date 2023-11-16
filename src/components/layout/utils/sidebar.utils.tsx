import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import BusinessIcon from '@mui/icons-material/Business';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import SidebarItem from "../interfaces/sidebarItem.interface";

export const getSideBarItems = (): SidebarItem[] => {
    return [
        {
            id: 1,
            label: 'Home',
            path: '/home',
            icon: <HomeIcon />
        },
        {
            id: 2,
            label: 'About',
            path: '/about',
            icon: <InfoIcon />
        },
        {
            id: 3,
            label: 'Contact',
            path: '/contact',
            icon: <CallIcon />
        },
        {
            id: 4,
            label: 'Departments',
            path: '/departments',
            icon: <GroupsIcon />
        },
        {
            id: 5,
            label: 'Roles',
            path: '/roles',
            icon: <ManageAccountsIcon />
        },
        {
            id: 6,
            label: 'Clients',
            path: '/clients',
            icon: <BusinessIcon />
        },
        {
            id: 7,
            label: 'Role Type Access',
            path: '/roletypes',
            icon: <VpnKeyIcon />
        }
    ]
}