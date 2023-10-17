import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthControllerApi, JwtRequest, JwtResponse } from "../../../openapi/api";

export const loginAction = createAsyncThunk<JwtResponse, JwtRequest>("login", async (request: JwtRequest) => {
    const authApi = new AuthControllerApi();
    const response = await authApi.login(request);
    return response.data;
})