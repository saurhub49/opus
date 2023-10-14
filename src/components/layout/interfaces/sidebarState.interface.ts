import SidebarItem from "./sidebarItem.interface";

interface SideBarState {
    isOpen: boolean;
    isLargeDevice: boolean;
    items: SidebarItem[];
}

export default SideBarState;