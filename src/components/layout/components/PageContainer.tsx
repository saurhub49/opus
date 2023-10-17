import { Box, CssBaseline, Stack, SxProps, Theme, useMediaQuery } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../global/redux/hooks";
import { toggleDeviceSize } from "../reducer/sidebar.slice";
import Sidebar from "./Sidebar";
import OpusAppBar from "./OpusAppBar";
import { drawerWidth } from "../constants/layoutConstants.constants";
import { Outlet } from "react-router-dom";

const pageLayoutSxProps: SxProps<Theme> = {
    paddingY: 10,
    paddingX: 20,
    height: '100%',
    width: 'auto',
    overflow: 'auto',
};

const PageContainer = () => {
    const isLargeDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(toggleDeviceSize(isLargeDevice));
    }, [dispatch, isLargeDevice]);

    const marginLeft = useMemo(() => isLargeDevice && isSidebarOpen ? drawerWidth + 'px' : 0, [isLargeDevice, isSidebarOpen]);

    return (
        <>
            <Sidebar />
            <Stack marginLeft={marginLeft} height='100%'>
                <OpusAppBar />
                <Box sx={pageLayoutSxProps}>
                    <CssBaseline />
                    <Outlet />
                </Box>
            </Stack>
        </>
    )
}

export default PageContainer;