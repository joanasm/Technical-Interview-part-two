import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import App from './App';
import reducer from './store/reducers/users';

import './index.css';

const store = createStore(reducer, applyMiddleware(thunk));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9c27b0',
      light: '#af52bf',
      dark: '#6d1b7b',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#ff3d00',
      light: '#ff6333',
      dark: '#b22a00',
      contrastText: '#FFF'
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

//serviceWorker.unregister();
