import { useState, useRef, useEffect, memo, useCallback } from 'react'
import { FaRegTrashCan, FaRegCircleCheck, FaRegPenToSquare } from "react-icons/fa6";
import { useTasksApi } from '../hooks/useTasksApi.jsx'
import { Spin } from 'antd'

const Task =({ task }) => {

    const [isEditTask, setIsEditTask] = useState(false)
    const [editText, setEditText] = useState(task.title)
    const [warning, setWarning] = useState('')
    const {deleteTask, changeTask, checkIsCompletedTask, loading, error} = useTasksApi()

    const inputRef = useRef(null)
    const buttonRef = useRef(null)

    const activeEditTask = useCallback(() => {
        setIsEditTask((prev) => !prev)
    }, [])


    const onChangeEditText = useCallback((e) => {
        setEditText(e.target.value)
    }, [])


    const saveEditTask = useCallback(() => {
        if (editText.trim() && editText.length > 0) {
            changeTask(task, editText)
            setIsEditTask(false)
            setWarning('')
        } else {
            setWarning('Пустые или пробельные строки — не добавлять!')
        }
    }, [editText, task, changeTask])


    const cancelEditTask = useCallback(() => {
        setEditText(task.title)
        setIsEditTask(false)
        setWarning('')
    }, [task.title])


    const typeKeyDown = useCallback((e) => {
        if (e.key === 'Enter') saveEditTask()
        if (e.key === 'Escape') cancelEditTask()
    }, [saveEditTask, cancelEditTask])


    const handleCheckChange = useCallback(() => {
        checkIsCompletedTask(task)
    }, [task, checkIsCompletedTask])

    const handleDelete = useCallback(() => {
        deleteTask(task.id)
    }, [task.id, deleteTask])


    useEffect(() => {
        if (!isEditTask) return

        const onClickOutside = (e) => {
            const isInsideWrapper = inputRef.current?.contains(e.target)

            const isSaveButton = buttonRef.current?.contains(e.target)

            if (!isInsideWrapper && !isSaveButton) {
                cancelEditTask()
            }
        }

        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [isEditTask,cancelEditTask])

    if (error) return <p className='text-red-500'>Ошибка загрузки: {error}</p>

    return (
        <>
            <Spin className='bg-white flex' spinning={loading}>
            <div>
                <input
                    type="checkbox"
                    value={task.title}
                    name="taskTitle"
                    checked={task.isCompleted}
                    onChange={handleCheckChange}
                />
                {!isEditTask ? (

                            <label
                            className={`self-center p-2 ${task.isCompleted ? 'line-through' : 'no-underline'}`}
                            htmlFor="taskTitle"
                        >
                            {task.title}
                        </label>


                ) : (
                    <input
                        className="p-1 m-2 border-1 border-gray-400 rounded-sm"
                        value={editText}
                        ref={inputRef}
                        onChange={onChangeEditText}
                        onKeyDown={typeKeyDown}
                    />
                )}
                {!isEditTask ? (
                    <button
                        className="p-1 hover:text-blue-800 text-green-800"
                        onClick={() => activeEditTask(task.id)}
                    >
                      <FaRegPenToSquare />
                    </button>
                ) : (
                    <button
                        className="p-1 mr-1 hover:text-blue-800 text-green-600 "
                        ref={buttonRef}
                        onClick={saveEditTask}
                    >
                        <FaRegCircleCheck/>
                    </button>
                )}
                <button
                    className="hover:text-blue-800 text-red-400 "
                    onClick={handleDelete}
                >
                    <FaRegTrashCan  />
                </button>
            </div>
        </Spin>
            <p className="text-red-600">{warning}</p>
        </>
    )
}
export default  memo(Task)
