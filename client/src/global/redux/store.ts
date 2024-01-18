import { combineReducers, configureStore } from '@reduxjs/toolkit';
import errorMiddleware from '../middleware/errorMiddleware';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from "../../components/welcome/reducer/authSlice.slice"
import sidebarSlice from "../../components/layout/reducer/sidebar.slice";
import snackbarSlice from "../snackbar/reducers/snackbar.slice";
import { clientApi } from "../../components/features/clients/apis/clients.api";
import { rbacApi } from '../../components/features/rbac/apis/rbac.api';
import { rolesApi } from '../../components/features/roles/apis/roles.api';
import { departmentApi } from '../../components/features/departments/apis/departments.api';
import { employeeApi } from '../../components/features/employees/api/employees.api';
import { authApi } from '../../components/welcome/apis/auth.api';
import profileSlice from '../../components/layout/reducer/profile.slice';

const rootReducer = combineReducers({
    snackbar: snackbarSlice,
    auth: authSlice,
    sidebar: sidebarSlice,
    profile: profileSlice,
    [clientApi.reducerPath]: clientApi.reducer,
    [rbacApi.reducerPath]: rbacApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [authApi.reducerPath]: authApi.reducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(authApi.middleware)
            .concat(clientApi.middleware)
            .concat(rbacApi.middleware)
            .concat(rolesApi.middleware)
            .concat(departmentApi.middleware)
            .concat(employeeApi.middleware)
            .concat(errorMiddleware),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
