const initialState = {
    text: ''
}

const inputTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'change_input':
            return {
                ...state,
                text: action.payload
            }
        default:
            return state
    }
}

export default inputTaskReducer
