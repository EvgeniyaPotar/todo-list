import { legacy_createStore as createStore, combineReducers} from 'redux';
import tasksReducer from './reducers/tasksReducer.js'
import inputTaskReducer from './reducers/inputTaskReducer.js'
import editTaskReducer from './reducers/editTaskReducer.js'
import loggerReducer from './reducers/loggerReducer.js'

const rootReducer = combineReducers({
    text: inputTaskReducer,
    tasks: tasksReducer,
    editTask: editTaskReducer,
    logger: loggerReducer
});

const store = createStore(rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;