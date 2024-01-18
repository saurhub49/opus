import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useAppDispatch, useAppSelector } from '../../../global/redux/hooks';
import React, { useState } from 'react';
import { toggleSidebar } from '../reducer/sidebar.slice';
import OpusLogo from '../../../global/logos/OpusLogo';
import blueGrey from '@mui/material/colors/blueGrey';
import theme from '../../../theme';
import logout from '../../../global/utils/logout.utils';
import { useNavigate } from 'react-router-dom';

const OpusAppBar = () => {
    const navigate = useNavigate();
    const { profile } = useAppSelector(state => state.profile);
    const { isOpen } = useAppSelector(state => state.sidebar);
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickMyProfile = React.useCallback(() => {
        handleClose();
        navigate('/profile');
    }, [navigate]);

    const handleLogout = React.useCallback(() => {
        handleClose();
        logout();
    }, []);

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
                        {!!profile && profile.firstName && profile.lastName &&
                            <Box display="flex" alignItems="center">
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    style={{ cursor: 'pointer', marginLeft: '10px', color: 'black' }}
                                    onClick={handleClick}>
                                    <Avatar
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            boxShadow: '0 32px 64px rgba(0, 0, 0, 0.4)',
                                        }}
                                    >
                                        {profile.firstName.charAt(0) + profile.lastName.charAt(0)}
                                    </Avatar>
                                    <Typography
                                        variant="body1"
                                    >
                                        {profile.firstName + ' ' + profile.lastName}
                                    </Typography>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <MenuItem onClick={onClickMyProfile}>My Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </Box>}
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default OpusAppBar;