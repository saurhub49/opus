import { BrowserRouter } from "react-router-dom";
import OpusAppBar from "./OpusAppBar";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import OpusRoutes from "../../../global/OpusRoutes";
import DrawerHeader from "./DrawerHeader";
import { getSideBarItems } from "../utils/sidebar.utils";



const PageContainer = () => {

    const sidebarItems = getSideBarItems();

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <OpusAppBar />
                <Sidebar items={sidebarItems} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <OpusRoutes />
                </Box>
            </Box>
        </BrowserRouter>
    )
}

export default PageContainer;