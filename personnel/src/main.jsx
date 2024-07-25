import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SidebarProvider } from './context/sidebarContext.jsx'
import Signup from './Components/Signup.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <SidebarProvider>
    <App /> 
    </SidebarProvider>
    
  </React.StrictMode>,
)
