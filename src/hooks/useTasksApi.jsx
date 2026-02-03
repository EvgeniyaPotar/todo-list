import axios from 'axios'
import { useCallback, useContext, useState, useMemo} from 'react'
import { API_BASE_URL, ENDPOINTS } from '../config/url.jsx'
import {TasksDispatchContext } from '../context/TasksContext.jsx'
import AuthContext from '../context/AuthContext.jsx'

export function useTasksApi(defaultIsLoading=false) {
    const dispatch = useContext(TasksDispatchContext)
    const [loading, setLoading] = useState(defaultIsLoading)
    const [error, setError] = useState(null)
    const {token} = useContext(AuthContext)

    const getAllTasks = useCallback(async() => {
        if (!token) return

        setLoading(true)
        try {
            const response =  await axios.get(
                `${API_BASE_URL}${ENDPOINTS.TASKS}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            dispatch({ type: 'set', tasks: response.data })
        } catch (error) {
            const errorMessage = error.response?.data?.message
            setError(errorMessage);
        } finally {setLoading(false)}
    },[token, dispatch])


    const addNewTask = useCallback(async(newTask) => {
        setLoading(true)
        try {
            const response = await axios.post(
                `${API_BASE_URL}${ENDPOINTS.TASKS}`,
                { title: newTask },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            dispatch({
                type: 'add',
                task: response.data
            })

        } catch (error) {
            const errorMessage = error.response?.data?.message
            setError(errorMessage);
        } finally { setLoading(false)}
    },[token, dispatch])

    const changeTask = useCallback(async(task, egitTask) => {
        setLoading(true)
        try{
            const response = await axios.patch(`${API_BASE_URL}${ENDPOINTS.TASKS}/${task.id}`,
                { title: egitTask },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
                )
            dispatch({
                type: 'change',
                id: response.data.id,
                title: response.data.title,
            })
        }catch (error) {
            const errorMessage = error.response?.data?.message
            setError(errorMessage);
        } finally { setLoading(false)}
    },[token, dispatch])

    const checkIsCompletedTask = useCallback(async(task) => {
        setLoading(true)
        try{
            const response = await axios.patch(`${API_BASE_URL}${ENDPOINTS.TASKS}/${task.id}/isCompleted`,
                { id: task.id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
                )
            const taskCompleted = response.data.find((item) => item.id = task.id)
            dispatch({
                type: 'check',
                id: taskCompleted.id,
                isCompleted: taskCompleted.isCompleted
            })

        } catch (error) {
            const errorMessage = error.response?.data?.message
            setError(errorMessage);
        } finally { setLoading(false) }

    },[token, dispatch])

    const deleteTask = useCallback(async (taskId) => {
        setLoading(true)
        try {
            const response = await axios.delete(`${API_BASE_URL}${ENDPOINTS.TASKS}/${taskId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
            dispatch({
                type: 'delete',
                id: response.data.id,
            })
        } catch (error) {
            const errorMessage = error.response?.data?.message
            setError(errorMessage);
        }  finally { setLoading(false)}
    },[token, dispatch])

    return useMemo(() => ({
        getAllTasks,
        addNewTask,
        deleteTask,
        changeTask,
        checkIsCompletedTask,
        error,
        loading
    }), [getAllTasks, addNewTask, deleteTask, changeTask, checkIsCompletedTask, error, loading])
}
