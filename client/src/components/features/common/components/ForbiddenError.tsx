import { Box } from "@mui/material";

const ForbiddenError: React.FC = () => {

    return (
        <>
            <Box
                component="img"
                src="forbidden.png"
                alt="403 Forbidden"
                sx={{
                    alignItems: 'center'
                }}
            />
        </>
    )
}

export default ForbiddenError;