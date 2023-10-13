import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../../components/features/login/reducer/authSlice.slice"
import sidebarSlice from "../../components/layout/reducer/sidebar.slice";

const rootReducer = combineReducers({
    auth: authSlice,
    sidebar: sidebarSlice
});

export default rootReducer;