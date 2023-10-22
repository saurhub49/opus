import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import RouteState from "../interfaces/routeState.interface";
import getAuthenticatedRoutes from "../utils/getAuthenticatedRoutes.utils";
import { ProfileDetailsDTORoleTypeNameEnum } from "../../../openapi";


const initialState: RouteState = {
    routes: getAuthenticatedRoutes(ProfileDetailsDTORoleTypeNameEnum.Employee),
}

const routeSlice = createSlice({
    name: 'route',
    initialState: initialState,
    reducers: {
        refreshRoutes: (state, action: PayloadAction<ProfileDetailsDTORoleTypeNameEnum>) => {
            state = {
                ...state,
                routes: getAuthenticatedRoutes(action.payload),
            }
            return state;
        }
    }
})

export const { refreshRoutes } = routeSlice.actions;
export default routeSlice.reducer;