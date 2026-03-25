import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice.js'
import inputTaskReducer from './slices/inputTaskSlice.js'
import editTaskReducer from './slices/editTaskSlice.js'
import authReducer from './slices/authSlice.js'
import { authMiddleware } from './middleware/authMiddleware.js'


const store = configureStore({
    reducer: {
        auth: authReducer,
        text: inputTaskReducer,
        tasks: tasksReducer,
        editTaskInput: editTaskReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
})

export default store
