import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../../../global/redux/hooks';
import React from 'react';
import { toggleSidebar } from '../reducer/sidebar.slice';
import { CustomAppBar } from '../utils/appBar.utils';

const OpusAppBar = () => {
    const open = useAppSelector(state => state.sidebar.isOpen);
    const dispatch = useAppDispatch();

    const handleDrawerOpen = React.useCallback(() => {
        dispatch(toggleSidebar({
            isOpen: true,
        }))
    }, [dispatch]);

    return (
        <CustomAppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Opus Appbar
                </Typography>
            </Toolbar>
        </CustomAppBar>
    )
}

export default OpusAppBar;