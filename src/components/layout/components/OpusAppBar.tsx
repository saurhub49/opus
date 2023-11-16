import { AppBar, IconButton, Stack, Toolbar } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useAppDispatch, useAppSelector } from '../../../global/redux/hooks';
import React from 'react';
import { toggleSidebar } from '../reducer/sidebar.slice';
import NotificationsIcon from '@mui/icons-material/Notifications';
import OpusLogo from '../../../global/logos/OpusLogo';
import blueGrey from '@mui/material/colors/blueGrey';
import theme from '../../../theme';

const OpusAppBar = () => {
    const { isOpen } = useAppSelector(state => state.sidebar);
    const dispatch = useAppDispatch();

    const handleDrawerToggle = React.useCallback(() => {
        dispatch(toggleSidebar(!isOpen));
    }, [dispatch, isOpen]);

    return (
        <AppBar elevation={4} position='sticky' sx={{
            px: 2,
            py: 1,
            width: '100%',
            backgroundColor: blueGrey[50]
        }}>
            <Toolbar>
                <Stack direction='row' width='100%' justifyContent='space-between' alignItems='center'>
                    <Stack direction='row' spacing={3}>
                        <IconButton onClick={handleDrawerToggle} sx={{
                            borderRadius: '0%',
                            backgroundColor: theme.palette.background.default,
                            boxShadow: 1,
                            alignSelf: 'center',
                            height: 'fit-content',
                        }}>
                            <MenuOpenIcon />
                        </IconButton>
                        {!isOpen && <Stack direction='row' alignItems='center'>
                            <OpusLogo />
                        </Stack>}
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