import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/authAsyncThunkActions.action";
import { AuthResponse } from "../../../openapi";


const initialState: AuthResponse = {
    token: "",
    username: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.token = '';
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state = {
                    ...state,
                    username: action.payload.username,
                    token: action.payload.token,
                };
                localStorage.setItem('token', state.token ?? '');
                return state;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.token = '';
            });
    },
});

export default authSlice.reducer;