import Task from './Task.jsx'
import { useContext, useState } from 'react'
import { TasksContext, TasksDispatchContext } from '../context/TasksContext.jsx'
import NavBar from './NavBar.jsx'

const TodoList = () => {
    const tasks = useContext(TasksContext)
    const [filter, setFilter] = useState('all')
    const dispatch = useContext(TasksDispatchContext)

    const filtredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.isDone
        if (filter === 'completed') return task.isDone
        if (filter === 'all') return true
    })

    return (
        <>
            <NavBar setFilter={setFilter} />
            <div className="p-2 border-b-1 flex flex-col items-start">
                {filtredTasks.length > 0 ? (
                    filtredTasks
                        .map((item) => <Task key={item.id} task={item} />)
                        .reverse()
                ) : (
                    <p> Нет задач.</p>
                )}
            </div>
            <div className="pt-5 p-2 flex justify-between">
                <p className="self-center">
                    Осталось дел: {tasks.filter((task) => !task.isDone).length}
                </p>
                <button
                    className="p-1 border-1 rounded-sm hover:text-blue-800"
                    onClick={() =>
                        dispatch({
                            type: 'deleteCompleted',
                        })
                    }
                >
                    Очистить выполненные
                </button>
            </div>
        </>
    )
}

export default TodoList
