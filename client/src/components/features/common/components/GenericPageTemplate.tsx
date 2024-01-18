import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularLoading from './CircularLoading';

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
        loading ? <CircularLoading /> : <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography gutterBottom variant="h4" component="div">
                        {title}
                    </Typography>
                    <Typography component="div" paddingBottom={1} variant="body2" color="text.secondary">
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
