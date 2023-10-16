import { createSlice } from "@reduxjs/toolkit";
import { PageUserDetailsDto } from "../../../../openapi";
import { getUsers } from "../actions/employee.action";


interface UserState {
    users: PageUserDetailsDto;
}

const initialState: UserState = {
    users: {},
}

const employeeSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.data
            })
    }
})

export default employeeSlice.reducer;