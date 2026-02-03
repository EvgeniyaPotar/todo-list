import InputTask from './InputTask.jsx'
import TodoList from './TodoList.jsx'

const Main = () => {

    return (
            <div className="p-5 border-t-2 flex flex-col">
                <InputTask />
                <TodoList />
            </div>
    )
}

export default Main
