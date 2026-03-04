import { useState,useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addNewTask } from '../redux/slices/tasksSlice.js'

const InputTask = () => {
    const dispatch = useDispatch()
    const [inputText, setInputText] = useState('')
    const [warning, setWarning] = useState('')

    const onChangeText = useCallback((e) => {
        setInputText(e.target.value)
        setWarning('')
    }, [])


    const addTask = useCallback(() => {
        if (inputText.trim() && inputText.length > 0) {
            dispatch(addNewTask(inputText.trim()))
            setInputText('')
            setWarning('')
        } else {
            setWarning('Пустые или пробельные строки — не добавлять!')
        }
    }, [inputText,dispatch])

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') addTask()
    }, [addTask])


    return (
        <div className="mb-3">
            <input
                name='title'
                className="p-1 mr-2 mb-2 border-1 border-gray-400  rounded-sm"
                value={inputText}
                type="text"
                onChange={onChangeText}
                placeholder="Введите текст задачи..."
                onKeyDown={handleKeyDown}
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
