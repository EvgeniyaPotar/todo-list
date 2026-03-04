import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isEditing: false,
    editingId: null,
    editingTitle: '',
}

const editTaskSlice = createSlice({
    name: 'editTaskInput',
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
        },
    },
    selectors: {
        isEditingTask: (sliceState) => sliceState.isEditing,
        editingIdTask: (sliceState) => sliceState.editingId,
        editingTitleTask: (sliceState) => sliceState.editingTitle,
    },
})

export const { startEdit, changeEditInput, finishEdit } = editTaskSlice.actions
export const { isEditingTask, editingIdTask, editingTitleTask } =
    editTaskSlice.selectors

export default editTaskSlice.reducer
