import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import DrawerHeader from './DrawerHeader';
import { useAppDispatch, useAppSelector } from '../../../global/redux/hooks';
import { toggleSidebar } from '../reducer/sidebar.slice';
import { OpusDrawer } from '../utils/appBar.utils';
import SidebarItem from '../interfaces/sidebarItem.interface';

interface SidebarProps {
    items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const { items } = props;
    const theme = useTheme();

    const open = useAppSelector(state => state.sidebar.isOpen);
    const dispatch = useAppDispatch();

    const handleDrawerClose = React.useCallback(() => {
        dispatch(toggleSidebar({
            isOpen: false,
        }))
    }, [dispatch])

    return (
        <OpusDrawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {items.map((item: SidebarItem) => (
                    <ListItem key={item.id} disablePadding sx={{
                        display: 'block',
                    }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                ':hover': {
                                    backgroundColor: theme.palette.info.light,
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    padding: '2px 8px',
                                    margin: '4px 16px',
                                }
                            }}
                            component={Link}
                            to={item.path}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </OpusDrawer>
    )
}

export default Sidebar;