import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProfileDetailsDTO } from "../../../openapi";
import { profileAction } from "../../welcome/actions/authAsyncThunkActions.action";


interface ProfileState {
    profile: ProfileDetailsDTO | null;
    loading: boolean;
}

const initialState: ProfileState = {
    profile: null,
    loading: false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<ProfileDetailsDTO>) => {
            state.profile = action.payload;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(profileAction.pending, (state) => {
                state.profile = null;
                state.loading = true;
                return state;
            })
            .addCase(profileAction.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
                return state;
            })
            .addCase(profileAction.rejected, (state) => {
                state.profile = null;
                state.loading = false;
                return state;
            })
    }
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;