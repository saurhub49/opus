import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SideBarState from "../interfaces/sidebarState.interface";
import getAuthenticatedSideBarItems from "../utils/getAuthenticatedSideBarItems.utils";
import { ProfileDetailsDTORoleTypeNameEnum } from "../../../openapi";

const sideBarInitialState: SideBarState = {
    isOpen: true,
    isLargeDevice: true,
    items: getAuthenticatedSideBarItems(ProfileDetailsDTORoleTypeNameEnum.Employee),
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: sideBarInitialState,
    reducers: {
        refreshSidebarItems: (state, action: PayloadAction<ProfileDetailsDTORoleTypeNameEnum>) => {
            state = {
                ...state,
                items: getAuthenticatedSideBarItems(action.payload),
            }
            return state;
        },
        toggleSidebar: (state, action: PayloadAction<boolean>) => {
            state = {
                ...state,
                isOpen: action.payload
            }
            return state;
        },
        toggleDeviceSize: (state, action: PayloadAction<boolean>) => {
            state = {
                ...state,
                isLargeDevice: action.payload
            }
            return state;
        }
    }
})

export const { toggleSidebar, toggleDeviceSize, refreshSidebarItems } = sidebarSlice.actions;
export default sidebarSlice.reducer;