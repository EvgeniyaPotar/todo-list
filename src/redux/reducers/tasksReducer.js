const initialState = {
    tasks:  [{ id: 1, title: 'Изучить JS', isDone: false }],
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'add': {
            return {...state,
                tasks: [
                ...state.tasks, { ...action.payload },
            ]}
        }

        case 'change': {
            return {
                ...state,
                tasks: state.tasks.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, title: action.title }
                        : item
                ),
            }
        }
        case 'delete':
        {
            return {...state,
                tasks: state.tasks.filter((item) => item.id !== action.payload)
            }
        }
        case 'check': {
            return {...state,
                tasks:  state.tasks.map((item) =>
                    item.id === action.payload ? { ...item, isDone: !item.isDone } : item
                )
            }

        }
        case 'deleteCompleted': {
            return {...state,
                tasks: state.tasks.filter((item) => !item.isDone)
            }
        }
        default: {
            return state;
        }
    }
}

export default tasksReducer