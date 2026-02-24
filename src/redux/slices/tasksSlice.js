import {createSlice} from '@reduxjs/toolkit'
import { v1 as uuid1 } from 'uuid'

const initialState = [{ id: 1, title: 'Изучить JS', isDone: false }]

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            state.push({
                id: uuid1(),
                title: action.payload,
                isDone: false,
            })
        },
        deleteTask(state, action) {
            return state.filter((item) => item.id !== action.payload)
        },
        changeTask(state, action) {
            console.log(action)
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, title: action.payload.title }
                    : item
            )
        },
        checkTask(state, action) {
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, isDone: !item.isDone }
                    : item
            )
        },
        deleteCompletedTasks(state) {
           return  state.filter((item) => !item.isDone)
        }
    },
})

export const { addTask, deleteTask, changeTask, checkTask, deleteCompletedTasks } =
    tasksSlice.actions
export default tasksSlice.reducer