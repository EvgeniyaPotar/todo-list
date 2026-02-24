import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        isEditing: false,
        editingId: null,
        editingTitle: '',
}

const editTaskSlice = createSlice({
    name: 'EditTaskInput',
    initialState,
    reducers: {
        startEdit(state, action) {
            state.isEditing = true
            state.editingId = action.payload.id
            state.editingTitle = action.payload.title
        },
        changeEditInput(state, action) {
            state.editingTitle = action.payload
        },
        finishEdit() {
            return initialState
        }
    },
})

export const { startEdit, changeEditInput, finishEdit } = editTaskSlice.actions
export default editTaskSlice.reducer
