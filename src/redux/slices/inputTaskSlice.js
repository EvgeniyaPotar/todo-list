import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: '',
}

const inputTaskSlice = createSlice({
    name: 'text',
    initialState,
    reducers: {
        changeInput(state, action) {
            state.value = action.payload
        },
    },
})

export const { changeInput } = inputTaskSlice.actions
export default inputTaskSlice.reducer
