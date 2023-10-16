import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../../components/features/login/reducer/authSlice.slice"
import sidebarSlice from "../../components/layout/reducer/sidebar.slice";
import snackbarSlice from "../snackbar/reducers/snackbar.slice";
import employeeSlice from "../../components/features/employees/reducers/employee.slice";

const rootReducer = combineReducers({
    snackbar: snackbarSlice,
    auth: authSlice,
    sidebar: sidebarSlice,
    employees: employeeSlice,
});

export default rootReducer;