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
    selectors: {
        inputText: (sliceState) => sliceState.value
    }
})

export const { changeInput } = inputTaskSlice.actions
export const { inputText } = inputTaskSlice.selectors
export default inputTaskSlice.reducer
