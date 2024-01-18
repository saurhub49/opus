import { Box, CircularProgress } from "@mui/material";


const CircularLoading: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
            <CircularProgress />
        </Box >
    )
}

export default CircularLoading;