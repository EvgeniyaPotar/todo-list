import { useState, useRef, useEffect, memo, useCallback } from 'react'
import { FaRegTrashCan, FaRegCircleCheck, FaRegPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'

import {
    deleteTask,
    changeTask,
    checkIsCompletedTask,
    errorTask
} from '../redux/slices/tasksSlice.js'


const Task =({ task }) => {
    const error = useSelector(errorTask)
    const [isEditTask, setIsEditTask] = useState(false)
    const [editText, setEditText] = useState(task.title)
    const [warning, setWarning] = useState('')
    const dispatch = useDispatch()
    const editTextRef = useRef(editText)


    const inputRef = useRef(null)
    const buttonRef = useRef(null)

    const activeEditTask = () => {
        setIsEditTask((prev) => !prev)
    }

    const onChangeEditText =(e) => {
        setEditText(e.target.value)
    }


    const saveEditTask = useCallback(() => {
        const currentText = editTextRef.current.trim()
        if (currentText) {
            dispatch(
                changeTask({
                    task: task,
                    editText: currentText,
                })
            )
            setIsEditTask(false)
            setWarning('')
        } else {
            setWarning('Пустые или пробельные строки — не добавлять!')
        }
    }, [task, dispatch])


    const cancelEditTask = useCallback(() => {
        setEditText(task.title)
        setIsEditTask(false)
        setWarning('')
    }, [task.title])


    const typeKeyDown = useCallback((e) => {
        if (e.key === 'Enter') saveEditTask()
        if (e.key === 'Escape') cancelEditTask()
    }, [saveEditTask, cancelEditTask])


    const handleCheckChange =() => {
        dispatch(checkIsCompletedTask(task))
    }

    const handleDelete = () => {
        dispatch(deleteTask(task.id))
    }


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

    useEffect(() => {
        editTextRef.current = editText
    }, [editText])

    if (error)
        return <p className="text-red-500">Ошибка загрузки: {error}</p>

    return (
        <>
            {/*<Spin className='bg-white flex' spinning={loading}>*/}
            <div>
                <input
                    type="checkbox"
                    value={task.title}
                    name="taskTitle"
                    checked={!!task.isCompleted}
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
        {/*</Spin>*/}
            <p className="text-red-600">{warning}</p>
        </>
    )
}
export default  memo(Task)
