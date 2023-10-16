import { useAppSelector } from "../../redux/hooks"
import OpusSnackbarItem from "./OpusSnackbarItem";

const OpusSnackbar: React.FC = () => {
    const snackbarItems = useAppSelector((state) => state.snackbar.snackbarItems);

    return (
        snackbarItems.map(snackbar => (
            <OpusSnackbarItem key={snackbar.id} snackbar={snackbar} />
        ))
    )
}

export default OpusSnackbar;