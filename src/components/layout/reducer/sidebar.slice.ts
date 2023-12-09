import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SideBarState from "../interfaces/sidebarState.interface"

const sideBarInitialState: SideBarState = {
    isOpen: true,
    isLargeDevice: true,
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: sideBarInitialState,
    reducers: {
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

export const { toggleSidebar, toggleDeviceSize } = sidebarSlice.actions;
export default sidebarSlice.reducer;