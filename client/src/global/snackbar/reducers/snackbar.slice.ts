import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Snackbar from "../interfaces/snackbar.interface";
import SnackbarType from "../enums/snackBarType.enum";

interface SnackbarState {
    snackbarItems: Snackbar[];
}

const snackbarInitialState: SnackbarState = {
    snackbarItems: [],
}

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: snackbarInitialState,
    reducers: {
        showSuccessMessage: (state, action: PayloadAction<string>) => {
            const snackbar: Snackbar = {
                id: Date.now(),
                isOpen: true,
                type: SnackbarType.SUCCESS,
                message: action.payload
            };
            state = {
                ...state,
                snackbarItems: [snackbar, ...state.snackbarItems].slice(0, 3)
            }
            return state;
        },

        showInfoMessage: (state, action: PayloadAction<string>) => {
            const snackbar: Snackbar = {
                id: Date.now(),
                isOpen: true,
                type: SnackbarType.INFO,
                message: action.payload
            };
            state = {
                ...state,
                snackbarItems: [snackbar, ...state.snackbarItems].slice(0, 3)
            }
            return state;
        },

        showWarningMessage: (state, action: PayloadAction<string>) => {
            const snackbar: Snackbar = {
                id: Date.now(),
                isOpen: true,
                type: SnackbarType.WARN,
                message: action.payload
            };
            state = {
                ...state,
                snackbarItems: [snackbar, ...state.snackbarItems].slice(0, 3)
            }
            return state;
        },

        showErrorMessage: (state, action: PayloadAction<string>) => {
            const snackbar: Snackbar = {
                id: Date.now(),
                isOpen: true,
                type: SnackbarType.ERROR,
                message: action.payload
            };
            state = {
                ...state,
                snackbarItems: [snackbar, ...state.snackbarItems].slice(0, 3)
            }
            return state;
        },

        removeSnackbar: (state, action: PayloadAction<number>) => {
            state = {
                ...state,
                snackbarItems: state.snackbarItems.filter((snackbar) => snackbar.id !== action.payload)
            };
            return state;
        }
    }
});


export const { showSuccessMessage, showInfoMessage, showWarningMessage, showErrorMessage, removeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;