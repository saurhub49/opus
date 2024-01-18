import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthControllerApi, JwtRequest, AuthResponse, UsersApi, ProfileDetailsDTO } from "../../../openapi/api";

export const loginAction = createAsyncThunk<AuthResponse, JwtRequest>("login", async (request: JwtRequest) => {
    const authApi = new AuthControllerApi();
    const response = await authApi.login(request);
    return response.data;
})

export const profileAction = createAsyncThunk<ProfileDetailsDTO | null, void>('profile', async () => {
    const api = new UsersApi();
    try {
        const response = await api.getUserProfile();
        return response.data;
    } catch (err) {
        console.log(err);
    }
    return null;
})