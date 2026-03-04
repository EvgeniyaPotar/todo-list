import Header from '../components/Header.jsx'
import Main from '../components/Main.jsx'
import {logout} from '../redux/slices/authSlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'


const TodoPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/', { replace: true })
    }
    return (
        <div className="border-2">
            <Header title="React To-Do List" />
            <Main />
            <button
                className="p-1 mb-4 border-1 rounded-sm text bg-gray-200 hover:text-blue-800"
                onClick={handleLogout}
            >
                Выйти
            </button>
        </div>
    )
}

export default TodoPage
