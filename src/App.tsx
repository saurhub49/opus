import React from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import OpusRoutes from './global/OpusRoutes';
import { Provider } from 'react-redux';
import store from './global/redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <OpusRoutes />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
