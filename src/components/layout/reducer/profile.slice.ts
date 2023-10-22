import { createSlice } from "@reduxjs/toolkit";
import { ProfileDetailsDTO } from "../../../openapi";
import { getUserProfile } from "../actions/profile.action";


interface ProfileState {
    profile: ProfileDetailsDTO;
    isProfileLoading: boolean;
}

const initialState: ProfileState = {
    profile: {},
    isProfileLoading: false
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserProfile.pending, (state) => {
            state = {
                ...state,
                profile: {},
                isProfileLoading: true,
            }
            return state;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state = {
                ...state,
                profile: action.payload,
                isProfileLoading: false,
            }
            return state;
        })
        .addCase(getUserProfile.rejected, (state) => {
            state = {
                ...state,
                profile: {},
                isProfileLoading: false,
            }
            return state;
        })
    }
})

export default profileSlice.reducer