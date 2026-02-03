import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import AuthProvider from './provider/AuthProvider.jsx'
import { TasksProvider } from './provider/TaskProvider.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <TasksProvider>
                        <App />
                </TasksProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
)
