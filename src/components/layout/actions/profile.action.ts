import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileDetailsDTO, UsersApi } from "../../../openapi";

export const getUserProfile = createAsyncThunk<ProfileDetailsDTO>('profileAction', async () => {
    const usersApi = new UsersApi();
    const response = await usersApi.getUserProfile();
    return response.data;
});