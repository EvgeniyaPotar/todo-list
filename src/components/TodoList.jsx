import Task from './Task.jsx'
import {useState, useMemo, useEffect, memo,useCallback } from 'react'
import NavBar from './NavBar.jsx'
import { Spin } from 'antd'
import { getAllTasks, deleteTask } from '../redux/slices/tasksSlice.js'
import { useDispatch, useSelector } from 'react-redux'


const TodoList = () => {
    const { tasks, error, isLoading: loading } = useSelector((store) => store.tasks)
    const dispatch = useDispatch()

    const [filter, setFilter] = useState('all')

    useEffect(() => {
        dispatch(getAllTasks())
    }, [dispatch]);


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

        completedIds.forEach((id) => dispatch(deleteTask(id)))
    }, [tasks, dispatch])

    const remainingCount = useMemo(() => {
        return tasks.filter((task) => !task.isCompleted).length
    }, [tasks])

    const  memoFilteredList = useMemo(() => {
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
