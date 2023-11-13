import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface PageTemplateProps {
    title: string;
    subtitle: string;
    pageActions?: ReactNode[];
    loading: boolean;
    children: ReactNode;
}

const GenericPageTemplate: React.FC<PageTemplateProps> = (props) => {
    const { title, subtitle, pageActions, loading, children } = props;
    return (
        loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }} >
            <CircularProgress />
        </Box > : <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="h4" component="h1" paddingY={1}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" component="div" paddingBottom={1}>
                        {subtitle}
                    </Typography>
                </Box>
                {pageActions && <Box>
                    {pageActions.map((action, index) => (
                        <span key={index} style={{ marginLeft: 16 }}>
                            {action}
                        </span>
                    ))}
                </Box>}
            </Box>
            {children}
        </Box>
    );
};

export default GenericPageTemplate;
