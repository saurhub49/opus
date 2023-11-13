import { combineReducers, configureStore } from '@reduxjs/toolkit';
import errorMiddleware from '../middleware/errorMiddleware';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from "../../components/welcome/reducer/authSlice.slice"
import sidebarSlice from "../../components/layout/reducer/sidebar.slice";
import snackbarSlice from "../snackbar/reducers/snackbar.slice";
import employeeSlice from "../../components/features/employees/reducers/employee.slice";
import { clientActions } from "../../components/features/clients/apis/clients.api";

const rootReducer = combineReducers({
    snackbar: snackbarSlice,
    auth: authSlice,
    sidebar: sidebarSlice,
    employees: employeeSlice,
    [clientActions.reducerPath]: clientActions.reducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(clientActions.middleware)
            .concat(errorMiddleware),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
