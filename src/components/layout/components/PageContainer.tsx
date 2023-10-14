import { BrowserRouter } from "react-router-dom";
import { Box, Stack, SxProps, Theme, useMediaQuery } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../global/redux/hooks";
import { toggleDeviceSize } from "../reducer/sidebar.slice";
import Sidebar from "./Sidebar";
import OpusAppBar from "./OpusAppBar";
import { drawerWidth } from "../constants/layoutConstants.constants";
import OpusRoutes from "../../../global/OpusRoutes";

const pageLayoutSxProps: SxProps<Theme> = {
    padding: 10,
    height: '100%',
    width: '100%',
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
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Stack marginLeft={marginLeft} height='100%' width='100%'>
                    <OpusAppBar />
                    <Box sx={pageLayoutSxProps}>
                        <OpusRoutes />
                    </Box>
                </Stack>
            </Box>
        </BrowserRouter>
    )
}

export default PageContainer;