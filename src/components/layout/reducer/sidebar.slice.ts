import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SideBarState from "../interfaces/sidebarState.interface"
import { getSideBarItems } from "../utils/sidebar.utils";


const sideBarInitialState: SideBarState = {
    isOpen: true,
    isLargeDevice: true,
    items: getSideBarItems(),
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