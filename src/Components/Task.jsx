import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPenToSquare,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
    startEdit,
    changeEditInput,
    finishEdit,
    isEditingTask,
    editingIdTask,
    editingTitleTask,
} from '../redux/slices/editTasksSlice.js'
import {
    deleteTask,
    changeTask,
    checkTask,
} from '../redux/slices/tasksSlice.js'


const Task = ({ task }) => {
    const [warning, setWarning] = useState('')

    const dispatch = useDispatch();
    const isEditing = useSelector(isEditingTask)
    const editingTitle = useSelector(editingTitleTask)
    const editingId = useSelector(editingIdTask)


    const isEditingThisTask = isEditing && editingId === task.id;

    const inputRef = useRef(null)
    const buttonRef = useRef(null)

    const handleEditClick = () => {
        dispatch(startEdit({ id: task.id, title: task.title }))
    }

    const handleInputChange = (e) => {
        dispatch(changeEditInput(e.target.value))
    };

    const saveEditTask = () => {
        if (editingTitle.trim() && editingTitle.length > 0) {
            dispatch(changeTask({ id: task.id, title: editingTitle}))
            dispatch(finishEdit())
            setWarning('')
        } else {
            setWarning('Пустые или пробельные строки — не добавлять!')
        }
    }

    const cancelEditTask = () => {
        dispatch(finishEdit())
        setWarning('')
    }

    const handleDelete = () => {
        dispatch(deleteTask(task.id))
    };
    const handleCheck = () => {
        dispatch(checkTask(task.id))
    };


    const typeKeyDown = (e) => {
        if (e.key === 'Enter') saveEditTask()
        if (e.key === 'Escape') cancelEditTask()
    }

    useEffect(() => {
        if (!isEditingThisTask) return

        const onClickOutside = (e) => {
            const isInsideWrapper = inputRef.current?.contains(e.target)

            const isSaveButton = buttonRef.current?.contains(e.target)

            if (!isInsideWrapper && !isSaveButton) {
                cancelEditTask()
            }
        }

        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [isEditingThisTask])

    return (
        <>
            <div>
                <input
                    type="checkbox"
                    value={task.title}
                    name="taskTitle"
                    checked={task.isDone}
                    onChange={handleCheck}
                />
                {!isEditingThisTask ? (
                    <label
                        className={`self-center p-2 ${task.isDone ? 'line-through' : 'no-underline'}`}
                        htmlFor="taskTitle"
                    >
                        {task.title}
                    </label>
                ) : (
                    <input
                        className="p-1 m-2 border-1 border-gray-400 rounded-sm"
                        value={editingTitle}
                        ref={inputRef}
                        onChange={handleInputChange}
                        onKeyDown={typeKeyDown}
                    />
                )}
                {!isEditingThisTask? (
                    <button
                        className="p-1 hover:text-blue-800"
                        onClick={handleEditClick}
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
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </div>
            <p className="text-red-600">{warning}</p>
        </>
    )
}
export default Task
