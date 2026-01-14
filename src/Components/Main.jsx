import { TasksProvider } from '../provider/TaskProvider.jsx'
import InputTask from './InputTask.jsx'
import TodoList from './TodoList.jsx'

const Main = () => {
    return (
        <TasksProvider>
            <div className="p-5 border-t-2 flex flex-col">
                <InputTask />
                <TodoList />
            </div>
        </TasksProvider>
    )
}

export default Main
