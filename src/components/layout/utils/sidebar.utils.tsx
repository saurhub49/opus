import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import BusinessIcon from '@mui/icons-material/Business';
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
            label: 'Clients',
            path: '/clients',
            icon: <BusinessIcon />
        }
    ]
}