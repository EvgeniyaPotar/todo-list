import { useContext, useState, useRef, useEffect } from 'react'
import { TasksDispatchContext } from '../context/TasksContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPenToSquare,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons'

const Task = ({ task }) => {
    const [isEditTask, setIsEditTask] = useState(false)
    const [editText, setEditText] = useState(task.title)
    const [warning, setWarning] = useState('')
    const dispatch = useContext(TasksDispatchContext)

    const inputRef = useRef(null)
    const buttonRef = useRef(null)

    const activeEditTask = () => {
        setIsEditTask((isEditTask) => !isEditTask)
    }

    const onChangeEditText = (e) => {
        setEditText(e.target.value)
    }

    const saveEditTask = () => {
        if (editText.trim() && editText.length > 0) {
            dispatch({
                type: 'change',
                task: task,
                title: editText,
            })
            setIsEditTask((isEditTask) => !isEditTask)
            setWarning('')
        } else {
            setWarning('Пустые или пробельные строки — не добавлять!')
        }
    }

    const cancelEditTask = () => {
        setEditText(task.title)
        setIsEditTask(false)
        setWarning('')
    }

    const typeKeyDown = (e) => {
        if (e.key === 'Enter') saveEditTask()
        if (e.key === 'Escape') cancelEditTask()
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
    }, [isEditTask])

    return (
        <>
            <div>
                <input
                    type="checkbox"
                    value={task.title}
                    name="taskTitle"
                    checked={task.isDone}
                    onChange={() =>
                        dispatch({
                            type: 'check',
                            id: task.id,
                        })
                    }
                />
                {!isEditTask ? (
                    <label
                        className={`self-center p-2 ${task.isDone ? 'line-through' : 'no-underline'}`}
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
                        className="p-1 hover:text-blue-800"
                        onClick={() => activeEditTask(task.id)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                ) : (
                    <button
                        className="p-1 mr-1 border-1 rounded-sm hover:text-blue-800"
                        ref={buttonRef}
                        onClick={saveEditTask}
                    >
                        Сохранить
                    </button>
                )}
                <button
                    className="hover:text-blue-800"
                    onClick={() =>
                        dispatch({
                            type: 'delete',
                            id: task.id,
                        })
                    }
                >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </div>
            <p className="text-red-600">{warning}</p>
        </>
    )
}
export default Task
