import './App.css';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './global/redux/store';
import OpusSnackbar from './global/snackbar/components/OpusSnackbar';
import OpusRoutes from './global/OpusRoutes';
import AxiosContext from './global/hooks/AxiosContext';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <AxiosContext>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <OpusRoutes />
          <OpusSnackbar />
        </ThemeProvider>
      </Provider>
    </AxiosContext>
  );
}

export default App;
