import { AlertColor, Snackbar as MUISnackbar, Alert } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useAppDispatch } from "../../redux/hooks";
import SnackbarType from "../enums/snackBarType.enum";
import { removeSnackbar } from "../reducers/snackbar.slice";
import Snackbar from "../interfaces/snackbar.interface";

interface OpusSnackbarItemProps {
    snackbar: Snackbar;
}

const OpusSnackbarItem: React.FC<OpusSnackbarItemProps> = (props) => {
    const { snackbar } = props;
    const dispatch = useAppDispatch();

    const handleCloseSnackbar = useCallback(() => {
        dispatch(removeSnackbar(snackbar.id));
    }, [dispatch, snackbar.id]);

    const alertColor: AlertColor = useMemo(() => {
        switch (snackbar.type) {
            case SnackbarType.SUCCESS:
                return 'success';

            case SnackbarType.INFO:
                return 'info';

            case SnackbarType.WARN:
                return 'warning';

            case SnackbarType.ERROR:
            default:
                return 'error';
        }
    }, [snackbar.type]);

    return (
        <MUISnackbar key={snackbar.id} open autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={alertColor} sx={{ width: '100%' }}>
                {snackbar.message}
            </Alert>
        </MUISnackbar>
    )
}

export default OpusSnackbarItem;