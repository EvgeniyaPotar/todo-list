import { Routes, Route  } from 'react-router'
import './App.css'
import TodoPage from './pages/TodoPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'


function App() {
    return (
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/todo" element={<TodoPage />} />
                </Route>
            </Routes>
    )
}

export default App
