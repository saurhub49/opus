import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SideBarState from "../interfaces/sidebarState.interface";


const sideBarInitialState: SideBarState = {
    isOpen: false,
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: sideBarInitialState,
    reducers: {
        toggleSidebar: (state, action: PayloadAction<SideBarState>) => {
            state = {
                ...state,
                isOpen: action.payload.isOpen
            }
            return state;
        }
    }
})

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;