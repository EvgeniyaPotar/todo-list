import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lastAction: null,
}

const loggerSlice = createSlice({
    name: 'logger',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => true,
            (state, action) => {
                state.lastAction = action;
            }
        );
    }
})

export default loggerSlice.reducer
