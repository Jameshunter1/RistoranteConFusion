import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './App'
import configureStore, { ConfigureStore } from './redux/configureStore'
import "./index.css"
const store = ConfigureStore()

render(
  
  
  <Provider store={store}>
    <HashRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
    </HashRouter>
  </Provider>,

 
document.getElementById('root')
)