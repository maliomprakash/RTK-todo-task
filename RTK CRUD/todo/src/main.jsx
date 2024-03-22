import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.jsx'
import { Provider } from 'react-redux'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Insert from './component/Insert.jsx'
import Home from './component/Home.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(

  
  <Provider store={store}>
  <BrowserRouter>
  <Routes>

  <Route path="/" element={<App />} />
  <Route path='/Insert' element={<Insert />} />
  <Route path='/Home' element={<Home />} />
  
  </Routes>
  </BrowserRouter>
    </Provider>
)
