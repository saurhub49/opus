import { AppBar, IconButton, Stack, Toolbar, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../../../global/redux/hooks';
import React from 'react';
import { toggleSidebar } from '../reducer/sidebar.slice';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';

const OpusAppBar = () => {
    const theme = useTheme()
    const { isOpen, isLargeDevice } = useAppSelector(state => state.sidebar);
    const dispatch = useAppDispatch();

    const handleDrawerToggle = React.useCallback(() => {
        dispatch(toggleSidebar(!isOpen));
    }, [dispatch, isOpen]);

    return (
        <AppBar elevation={0} position='relative'>
            <Toolbar sx={
                {
                    backgroundColor: theme.palette.info.light
                }
            }>
                <Stack direction='row' width='100%' justifyContent='space-between' alignItems='center'>
                    <Stack direction='row' spacing={4}>
                        <IconButton onClick={handleDrawerToggle}>
                            {/* Icons are yet to be configured */}
                            {
                                isOpen ? <ChevronLeftIcon />
                                    : isLargeDevice ? <ChevronRightIcon />
                                        : <MenuIcon />
                            }
                        </IconButton>
                        <Stack direction='row' alignItems='center'>
                            {/* App logo and name */}
                            <MenuIcon />
                        </Stack>
                    </Stack>
                    <Stack direction='row' spacing={4} alignItems='center'>
                        <NotificationsIcon />
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default OpusAppBar;