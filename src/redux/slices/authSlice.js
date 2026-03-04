import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_BASE_URL, ENDPOINTS } from '../../config/url.jsx'

const getToken = async (registerUser) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${ENDPOINTS.AUTH_LOGIN}`,
            { email: registerUser.email, password: registerUser.password },
            { headers: { 'Content-Type': 'application/json' } }
        )
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

const addNewUser = async (newUser) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${ENDPOINTS.AUTH_REGISTER}`,
            newUser,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export const authUser = createAsyncThunk(
    'auth/authUser',
    async (userData, { rejectWithValue }) => {
        try {
            const {token} = await getToken(userData)
            return token
        } catch (error) {
            console.log(error.errors)
            return rejectWithValue(
                error.response?.data?.errors || 'Ошибка авторизации'
            )
        }
    }
)

export const registrationUser = createAsyncThunk(
    'auth/registrationUser',
    async (newUserData, { rejectWithValue }) => {
        try {
            const data = await addNewUser(newUserData)
            return data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Ошибка при регистрации'
            )
        }
    }
)

const initialState = {
    user: {},
    token: '',
    isLoading: false,
    errorAuth: null,
    errorRegist: null
}

const authSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(authUser.fulfilled, (state, action) => {
                state.token = action.payload
                state.user = {
                    login: action.meta.arg.email,
                    password: action.meta.arg.password,
                }
                localStorage.setItem('token', state.token)
                state.isLoading = false
                state.errorAuth = null
            })
            .addCase(authUser.pending, (state, action) => {
                state.isLoading = action.payload
            })
            .addCase(authUser.rejected, (state, action) => {
                state.errorAuth = action.payload
            })
            .addCase(registrationUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.errorRegist = null
            })
            .addCase(registrationUser.pending, (state, action) => {
                state.isLoading = action.payload
            })
            .addCase(registrationUser.rejected, (state, action) => {
                state.errorRegist = action.payload
                state.isLoading = false
            })

    },
    initialState,
    name: 'auth',
    reducers: {
        logout(state) {
        state.user = {}
        state.token = ''
        localStorage.removeItem('token')
        },
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
