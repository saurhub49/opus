import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface PageTemplateProps {
    title: string;
    subtitle: string;
    pageActions?: ReactNode[];
    children: ReactNode;
}

const GenericPageTemplate: React.FC<PageTemplateProps> = (props) => {
    const { title, subtitle, pageActions, children } = props;
    return (
        <Box>
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
