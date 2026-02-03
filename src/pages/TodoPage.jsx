import { useContext } from 'react'
import Header from '../components/Header.jsx'
import Main from '../components/Main.jsx'
import AuthContext from '../context/AuthContext.jsx'

const TodoPage = () => {
    const {logout} = useContext(AuthContext)

    return(
        <div className="border-2">
            <Header title = "React To-Do List"/>
            <Main />
            <button
                     className="p-1 mb-4 border-1 rounded-sm text bg-gray-200 hover:text-blue-800"
                     onClick={logout}>
                Выйти
            </button>
        </div>
    )
}

export default TodoPage
