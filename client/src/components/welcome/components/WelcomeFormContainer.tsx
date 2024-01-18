import { ThemeProvider } from "@emotion/react";
import { Grid, CssBaseline, Paper, createTheme } from "@mui/material";

interface WelcomeFormContainerProps {
    children: React.ReactElement;
}

const defaultTheme = createTheme();

const WelcomeFormContainer: React.FC<WelcomeFormContainerProps> = (props) => {
    const { children } = props;

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/opus-login.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    {children}
                </Grid>
            </Grid>
        </ThemeProvider>
    )
};

export default WelcomeFormContainer;