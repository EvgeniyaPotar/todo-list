import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice.js'
import inputTaskReducer from './slices/inputTaskSlice.js'
import editTaskReducer from './slices/editTasksSlice.js'
import loggerReducer from './slices/loggerSlice.js'

const rootReducer = combineReducers({
    text: inputTaskReducer,
    tasks: tasksReducer,
    editTaskInput: editTaskReducer,
    logger: loggerReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store;