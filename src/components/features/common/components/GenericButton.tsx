import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type GenericButtonProps = ButtonProps & {
    loading?: boolean;
}

const GenericButton: React.FC<GenericButtonProps> = (props) => {
    const { loading, ...rest } = props;

    return (
        <Button {...rest} disabled={loading} endIcon={loading ? <CircularProgress size={24} /> : null} />
    );

};

export default GenericButton;