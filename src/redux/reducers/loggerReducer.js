const initialState = {
    lastAction: null,

};

const loggerReducer = (state = initialState, action) => {
    return {
        ...state,
        lastAction: action,
    };
}

export default loggerReducer