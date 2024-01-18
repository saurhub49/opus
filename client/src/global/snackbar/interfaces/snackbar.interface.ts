import SnackbarType from "../enums/snackBarType.enum";

interface Snackbar {
    id: number;
    isOpen: boolean;
    type: SnackbarType;
    message: string;
}

export default Snackbar;