import InputTask from './InputTask.jsx'
import TodoList from './TodoList.jsx'
import { withLogger } from '../HOC/withLogger.jsx'

const WrapTodoList = withLogger(TodoList)

const Main = () => {

    return (
        <div className="p-5 border-t-2 flex flex-col">
            <InputTask />
            <WrapTodoList />
        </div>
    )
}

export default Main