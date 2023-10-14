import React from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './global/redux/store';
import PageContainer from './components/layout/components/PageContainer';
import OpusSnackbar from './global/snackbar/components/OpusSnackbar';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PageContainer />
        <OpusSnackbar />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
