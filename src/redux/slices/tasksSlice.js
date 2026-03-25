import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL, ENDPOINTS } from '../../config/url.jsx'


export const getAllTasks = createAsyncThunk(
    'tasks/getAllTasks',
    async (_, { getState, rejectWithValue }) => {
        try {
            const store = getState()
            const response = await axios.get(
                `${API_BASE_URL}${ENDPOINTS.TASKS}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${store.auth.token}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async (newTask, { getState, rejectWithValue }) => {
        try {
            const store = getState()
            const response = await axios.post(
                `${API_BASE_URL}${ENDPOINTS.TASKS}`,
                { title: newTask },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${store.auth.token}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const changeTask = createAsyncThunk(
    'tasks/changeTask',
    async ({ task, editText }, { getState, rejectWithValue }) => {
        try {
            const store = getState()
            const response = await axios.patch(
                `${API_BASE_URL}${ENDPOINTS.TASKS}/${task.id}`,
                { title: editText },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${store.auth.token}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const checkIsCompletedTask = createAsyncThunk(
    'tasks/checkIsCompletedTask',
    async (task, { getState, rejectWithValue }) => {
        try {
            const store = getState()
            const response = await axios.patch(
                `${API_BASE_URL}${ENDPOINTS.TASKS}/${task.id}/isCompleted`,
                { id: task.id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${store.auth.token}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId, { getState, rejectWithValue }) => {
        try {
            const store = getState()
            const response = await axios.delete(
                `${API_BASE_URL}${ENDPOINTS.TASKS}/${taskId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${store.auth.token}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

const initialState = {
    tasks:[],
    isLoading: false,
    error: null
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.error = action.payload
            })

            .addCase(addNewTask.fulfilled, (state, action) => {
                const { user_id, ...rest } = action.payload
                state.tasks.push(rest)
            })
            .addCase(addNewTask.rejected, (state, action) => {
                state.error = action.payload
            })

            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(
                    (item) => item.id !== action.payload.id
                )
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload
            })

            .addCase(changeTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, title: action.payload.title }
                        : item
                )
            })
            .addCase(changeTask.rejected, (state, action) => {
                state.error = action.payload
            })

            .addCase(checkIsCompletedTask.fulfilled, (state, action) => {
                const updatedTask = action.payload[0]

                if (updatedTask) {
                    const index = state.tasks.findIndex(
                        (item) => item.id === updatedTask.id
                    )

                    if (index !== -1) {
                        state.tasks[index] = updatedTask
                    }
                }
            })
            .addCase(checkIsCompletedTask.rejected, (state, action) => {
                state.error = action.payload
            })

            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true
                }
            )
            .addMatcher(
                (action) =>
                    action.type.endsWith('/fulfilled') ||
                    action.type.endsWith('/rejected'),
                (state) => {
                    state.isLoading = false
                }
            )
    },
    selectors: {
        errorTask: (sliceState) => sliceState.error,
    },
})


export const { errorTask } = tasksSlice.selectors
export default tasksSlice.reducer
