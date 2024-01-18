import React, { useState, useEffect, ReactNode } from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GenericButton from '../../components/features/common/components/GenericButton';

interface ErrorBoundaryProps {
    children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    const handleRefresh = (): void => {
        // Navigate to the home screen (/about)
        navigate('/about');
    };

    useEffect(() => {
        const handleError = (event: ErrorEvent): void => {
            setHasError(true);
            // Log error here if needed
            console.error(event.message)
        };

        window.addEventListener('error', handleError);

        const handleUnhandledRejection = (event: PromiseRejectionEvent): void => {
            setHasError(true);
            // Log error here if needed
            console.error(event)
        };

        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);



    if (hasError) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h5" color="error">
                    Something went wrong. Please try again later.
                </Typography>
                <GenericButton variant='contained' loading={false} onClick={handleRefresh}>
                    Refresh
                </GenericButton>
            </Box>
        );
    }

    return <>{children}</>;
};

export default ErrorBoundary;
