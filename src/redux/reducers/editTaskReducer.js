const initialState = {
    isEditing: false,
    editingId: null,
    editingTitle: ''
}

const editTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'start_edit': {
            return {
                ...state,
                isEditing: true,
                editingId: action.payload.id,
                editingTitle: action.payload.title
            }
        }
        case 'change_edit_input': {
            return {
                ...state,
                editingTitle: action.payload
            }
        }
        case 'finish_edit': {
            return {
                ...state,
                isEditing: false,
                editingId: null,
                editingTitle: ''
            }
        }
        default:
            return state
    }
}

export default editTaskReducer