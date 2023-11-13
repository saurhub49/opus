import { Box, Modal } from "@mui/material";

interface GenericModalProps {
    open: boolean;
    handleClose: () => void;
    children: React.ReactElement;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 400,
    bgcolor: 'background.paper',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)',
    p: 4,
};

const GenericModal: React.FC<GenericModalProps> = (props) => {
    const { open, handleClose, children } = props;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
}

export default GenericModal