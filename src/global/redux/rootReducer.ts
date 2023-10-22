import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../../components/welcome/reducer/authSlice.slice"
import sidebarSlice from "../../components/layout/reducer/sidebar.slice";
import snackbarSlice from "../snackbar/reducers/snackbar.slice";
import employeeSlice from "../../components/features/employees/reducers/employee.slice";
import routeSlice from "../../components/layout/reducer/route.slice";
import profileSlice from "../../components/layout/reducer/profile.slice";

const rootReducer = combineReducers({
    snackbar: snackbarSlice,
    auth: authSlice,
    profile: profileSlice,
    routes: routeSlice,
    sidebar: sidebarSlice,
    employees: employeeSlice,
});

export default rootReducer;