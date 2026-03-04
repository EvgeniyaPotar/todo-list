import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice.js'
import inputTaskReducer from './slices/inputTaskSlice.js'
import editTaskReducer from './slices/editTaskSlice.js'
import authReducer from './slices/authSlice.js'


const rootReducer = combineReducers({
    auth: authReducer,
    text: inputTaskReducer,
    tasks: tasksReducer,
    editTaskInput: editTaskReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store
