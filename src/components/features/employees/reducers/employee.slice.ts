import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../actions/employee.action";
import { UserDetailsDTO } from "../../../../openapi";


interface UserState {
    users: UserDetailsDTO[];
    isLoading: boolean;
}

const initialState: UserState = {
    users: [],
    isLoading: false
}

const employeeSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data
            })
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
    }
})

export default employeeSlice.reducer;