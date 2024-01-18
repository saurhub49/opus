import RoleTypes from "../enums/roleTypes.enum";

interface Route {
    id: number;
    path: string;
    label: string;
    icon: JSX.Element;
    element: React.FC;
    isSidebarElement: boolean;
    permissions: RoleTypes[];
}

export default Route;