import { useEffect, useReducer } from 'react'
import { TasksContext, TasksDispatchContext } from '../context/TasksContext.jsx'

export function TasksProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, init())

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    return (
        <TasksContext value={tasks}>
            <TasksDispatchContext value={dispatch}>
                {children}
            </TasksDispatchContext>
        </TasksContext>
    )
}

const init = () => JSON.parse(localStorage.getItem('tasks')) || initialTasks

const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case 'add': {
            return [
                ...tasks,
                {
                    id: action.id,
                    title: action.title,
                    isDone: false,
                },
            ]
        }
        case 'change': {
            return tasks.map((item) =>
                item.id === action.task.id
                    ? { ...item, title: action.title }
                    : item
            )
        }
        case 'delete': {
            return tasks.filter((item) => item.id !== action.id)
        }
        case 'check': {
            return tasks.map((item) =>
                item.id === action.id ? { ...item, isDone: !item.isDone } : item
            )
        }
        case 'deleteCompleted': {
            return tasks.filter((item) => !item.isDone)
        }
        default: {
            throw Error('Unknown action: ' + action.type)
        }
    }
}

const initialTasks = [{ id: 1, title: 'Изучить JS', isDone: false }]
