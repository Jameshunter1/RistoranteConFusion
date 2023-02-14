import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducer';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const store = configureStore({
  reducer: rootReducer
});

render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
