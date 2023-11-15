import { combineReducers, configureStore } from '@reduxjs/toolkit';
import errorMiddleware from '../middleware/errorMiddleware';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from "../../components/welcome/reducer/authSlice.slice"
import sidebarSlice from "../../components/layout/reducer/sidebar.slice";
import snackbarSlice from "../snackbar/reducers/snackbar.slice";
import employeeSlice from "../../components/features/employees/reducers/employee.slice";
import { clientApi } from "../../components/features/clients/apis/clients.api";
import { rbacApi } from '../../components/features/rbac/apis/rbac.api';

const rootReducer = combineReducers({
    snackbar: snackbarSlice,
    auth: authSlice,
    sidebar: sidebarSlice,
    employees: employeeSlice,
    [clientApi.reducerPath]: clientApi.reducer,
    [rbacApi.reducerPath]: rbacApi.reducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(clientApi.middleware)
            .concat(rbacApi.middleware)
            .concat(errorMiddleware),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
