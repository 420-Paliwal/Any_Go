import { StrictMode, } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import UserContext1 from './context/UserContext1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext1>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </UserContext1>
  </StrictMode>,
)
