import {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeInput, inputText} from '../redux/slices/inputTaskSlice.js'
import { addTask } from '../redux/slices/tasksSlice.js'


const InputTask = () => {
    const [warning, setWarning] = useState('')
    const dispatch = useDispatch()
    const text = useSelector(inputText)

    const onChangeText = (e) => {
        dispatch(changeInput(e.target.value))
        setWarning('')
    }

    const addNewTask = () => {
        text.trim() && text.length > 0
            ? dispatch(addTask(text))
            : setWarning('Пустые или пробельные строки — не добавлять!')
        dispatch(changeInput(''))
    }

    return (
        <div className="mb-3">
            <input
                className="p-1 mr-2 mb-2 border-1 border-gray-400  rounded-sm"
                value={text}
                type="text"
                onChange={onChangeText}
                placeholder="Введите тест задачи..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter') addNewTask()
                }}
            />
            <button
                type="button"
                className="p-1 border-1 rounded-sm hover:text-blue-800"
                onClick={addNewTask}
            >
                Добавить
            </button>
            <p className="text-red-600">{warning}</p>
        </div>
    )
}

export default InputTask
