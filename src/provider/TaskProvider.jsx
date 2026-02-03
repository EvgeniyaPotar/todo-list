import { useReducer} from 'react'
import { TasksContext, TasksDispatchContext } from '../context/TasksContext.jsx'


const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case 'set':
            return action.tasks
        case 'add': {
            return [...tasks, action.task]
        }
        case 'change': {
            return tasks.map((item) =>
                item.id === action.id
                    ? { ...item, title: action.title }
                    : item
            )
        }
        case 'delete': {
            return tasks.filter((item) => item.id !== action.id)
        }
        case 'check': {
            return tasks.map((item) =>
                item.id === action.id ? { ...item, isCompleted: action.isCompleted} : item
            )
        }
        case 'deleteCompleted': {
            return tasks.filter((item) => !item.isCompleted)
        }
        default: {
            throw Error('Unknown action: ' + action.type)
        }
    }
}


export function TasksProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, [])


    return (
        <TasksContext value={tasks}>
            <TasksDispatchContext value={dispatch}>
                {children}
            </TasksDispatchContext>
        </TasksContext>
    )
}

