import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPenToSquare,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { startEditAction, changeEditInputAction, finishEditAction } from '../redux/actions/editTasksActions.js';
import { deleteTaskAction, checkTaskAction, changeTaskAction } from '../redux/actions/tasksActions.js';


const Task = ({ task }) => {
    const [warning, setWarning] = useState('')

    const dispatch = useDispatch();
    const { isEditing, editingId, editingTitle } = useSelector(state => state.editTask);

    const isEditingThisTask = isEditing && editingId === task.id;

    const inputRef = useRef(null)
    const buttonRef = useRef(null)

    const handleEditClick = () => {
        dispatch(startEditAction(task.id, task.title));
    };

    const handleInputChange = (e) => {
        dispatch(changeEditInputAction(e.target.value));
    };

    const saveEditTask = () => {
        if (editingTitle.trim() && editingTitle.length > 0) {
            dispatch(finishEditAction());
            dispatch(changeTaskAction(task.id, editingTitle));
            setWarning('')
        } else {
            setWarning('Пустые или пробельные строки — не добавлять!')
        }
    }

    const cancelEditTask = () => {
        dispatch(finishEditAction());
        setWarning('')
    }

    const handleDelete = () => {
        dispatch(deleteTaskAction(task.id));
    };
    const handleCheck = () => {
        dispatch(checkTaskAction(task.id));
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
