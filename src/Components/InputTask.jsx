import {  useState } from 'react'
import { addTaskAction } from '../redux/actions/tasksActions.js'
import { useDispatch, useSelector } from 'react-redux'
import { changeInputAction } from '../redux/actions/inputTaskAction.js'
import { v1 as uuid1 } from 'uuid'

const InputTask = () => {
    const [warning, setWarning] = useState('')
    const dispatch = useDispatch()
    const { text } = useSelector(store => store.text)

    const onChangeText = (e) => {
        dispatch(changeInputAction(e.target.value))
        setWarning('')
    }

    const addTask = () => {
        text.trim() && text.length > 0
            ? dispatch(addTaskAction({ id: uuid1(), title: text, isDone: false}))

            : setWarning('Пустые или пробельные строки — не добавлять!')
        dispatch(changeInputAction(''))
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
