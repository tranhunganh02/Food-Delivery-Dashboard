import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider} from "./context/ChatContext"
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <AuthContextProvider>
   <ChatContextProvider>
    <App/>
   </ChatContextProvider>
  </AuthContextProvider>
  </>
)
