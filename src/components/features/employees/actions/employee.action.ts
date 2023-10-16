import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersApi } from "../../../../openapi";

const usersApi = new UsersApi();

export const getUsers = createAsyncThunk("users/all", async () => {
    const response = usersApi.getAllUsers();
    return response;
})