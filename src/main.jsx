import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore  from 'redux-persist/es/persistStore'
//import dotenv from "dotenv";

//dotenv.config();

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
  </Provider>
  </PersistGate>
)
