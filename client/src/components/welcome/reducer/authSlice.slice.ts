import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/authAsyncThunkActions.action";

interface AuthResponseState {
    loading: boolean;
}

const initialState: AuthResponseState = {
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
                return state;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.token ?? '');
                state.loading = false;
                return state;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                return state;
            });
    },
});

export default authSlice.reducer;