import Task from './Task.jsx'
import { useContext, useState, useMemo, useEffect, memo,useCallback } from 'react'
import { TasksContext } from '../context/TasksContext.jsx'
import NavBar from './NavBar.jsx'
import { useTasksApi } from '../hooks/useTasksApi.jsx'
import { Spin } from 'antd'


const TodoList = () => {
    const { getAllTasks, deleteTask, error, loading } = useTasksApi(true)

    const tasks = useContext(TasksContext)
    const [filter, setFilter] = useState('all')


    useEffect(() => {
        getAllTasks();
    }, []);


    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isCompleted)
            case 'completed':
                return tasks.filter(task => task.isCompleted)
            default:
                return tasks
        }
    }, [tasks, filter])

    const deleteIsCompletedTask = useCallback(() => {
        const completedIds = tasks
            .filter(task => task.isCompleted)
            .map(task => task.id)

        completedIds.forEach(id => deleteTask(id))
    }, [tasks, deleteTask])

    const remainingCount = useMemo(() => {
        return tasks.filter((task) => !task.isCompleted).length
    }, [tasks])

    const memoFilteredList = useMemo(() => {
        return [...filteredTasks]
            .reverse()
            .map(task => <Task key={task.id} task={task} />)
    }, [filteredTasks])

    if (error) return <p>Ошибка загрузки: {error}</p>

    return (
        <>
            <NavBar setFilter={setFilter} />
            <Spin spinning={loading} className='bg-white'>
            <div className="p-2 border-b-1 flex flex-col items-start">
                {filteredTasks.length> 0 ? (
                    memoFilteredList
                ) : (
                    <p> Нет задач.</p>
                )}
            </div>
            <div className="pt-5 p-2 flex justify-between gap-4">
                <p className="self-center">
                    Осталось дел: {remainingCount}
                </p>
                <button
                    className="p-1 border-1 rounded-sm hover:text-blue-800"
                    onClick={deleteIsCompletedTask}
                >
                    Очистить выполненные
                </button>
            </div>
            </Spin>
        </>
    )
}

export default memo(TodoList)
