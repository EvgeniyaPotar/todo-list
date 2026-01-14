import { useContext, useState } from 'react'
import { TasksDispatchContext } from '../context/TasksContext.jsx'
import { v1 as uuid1 } from 'uuid'

const InputTask = () => {
    const [inputText, setInputText] = useState('')
    const [warning, setWarning] = useState('')
    const dispatch = useContext(TasksDispatchContext)

    const onChangeText = (e) => {
        setInputText(e.target.value)
        setWarning('')
    }

    const addTask = () => {
        inputText.trim() && inputText.length > 0
            ? dispatch({
                  id: uuid1(),
                  type: 'add',
                  title: inputText,
              })
            : setWarning('Пустые или пробельные строки — не добавлять!')
        setInputText('')
    }

    return (
        <div className="mb-3">
            <input
                className="p-1 mr-2 mb-2 border-1 border-gray-400  rounded-sm"
                value={inputText}
                type="text"
                onChange={onChangeText}
                placeholder="Введите тест задачи..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter') addTask()
                }}
            />
            <button
                type="button"
                className="p-1 border-1 rounded-sm hover:text-blue-800"
                onClick={addTask}
            >
                Добавить
            </button>
            <p className="text-red-600">{warning}</p>
        </div>
    )
}

export default InputTask
