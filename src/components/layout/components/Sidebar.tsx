import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../global/redux/hooks';
import { toggleSidebar } from '../reducer/sidebar.slice';
import { Box, Drawer, Grid, ListItem, PaperProps, Toolbar } from '@mui/material';
import { drawerWidth } from '../constants/layoutConstants.constants';
import OpusLogo from '../../../global/logos/OpusLogo';
import { blueGrey } from '@mui/material/colors';
import Route from '../../../global/interfaces/route.interface';
import { getSidebarElements } from '../../../global/utils/routes.utils';
import RoleTypes from '../../../global/enums/roleTypes.enum';

const drawerPaperProps: Partial<PaperProps<React.ElementType<any>>> = {
    sx: {
        width: drawerWidth + 'px',
        backgroundColor: blueGrey[50],
        boxShadow: 3
    }
};

const Sidebar: React.FC = () => {
    const theme = useTheme();
    const profile = useAppSelector(state => state.profile.profile);
    const { isOpen, isLargeDevice } = useAppSelector(state => state.sidebar);
    const dispatch = useAppDispatch();

    const items = React.useMemo(() => getSidebarElements(profile?.roleTypeName as RoleTypes), [profile]);

    const handleDrawerToggle = React.useCallback(() => {
        dispatch(toggleSidebar(!isOpen));
    }, [dispatch, isOpen])

    return (
        <Drawer variant={isLargeDevice ? 'persistent' : 'temporary'} elevation={4} open={isOpen} anchor='left' onClose={handleDrawerToggle} PaperProps={drawerPaperProps}>
            <Toolbar>
                <Grid px={5} py={2} container justifyContent='center' alignItems='center'>
                    <OpusLogo />
                    {
                        !isLargeDevice && (
                            <IconButton type='button' color='secondary' onClick={handleDrawerToggle}></IconButton>
                        )
                    }
                </Grid>
            </Toolbar>
            <Box overflow='auto'>
                <List>
                    {items.map((item: Route) => (
                        <ListItem key={item.id} disablePadding sx={{
                            display: 'block',
                            ':hover': {
                                backgroundColor: blueGrey[100],
                                borderRadius: '8px',
                                //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                //padding: '2px 8px',
                                margin: '4px 16px',
                            }
                        }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: isOpen ? 'initial' : 'center',
                                    px: 2.5,
                                    ":hover": {
                                        color: theme.palette.primary.light
                                    }
                                }}
                                component={Link}
                                to={item.path}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isOpen ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'inherit'
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} sx={{ opacity: isOpen ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default Sidebar;