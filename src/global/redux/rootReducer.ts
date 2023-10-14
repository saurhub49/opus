import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../../components/features/login/reducer/authSlice.slice"
import sidebarSlice from "../../components/layout/reducer/sidebar.slice";
import snackbarSlice from "../snackbar/reducers/snackbar.slice";

const rootReducer = combineReducers({
    snackbar: snackbarSlice,
    auth: authSlice,
    sidebar: sidebarSlice
});

export default rootReducer;