export const  addTaskAction = (task) => ({type: 'add', payload: task})

export const  deleteTaskAction = (id) => ({type: 'delete', payload: id})

export const checkTaskAction = (id) => ({type: 'check', payload: id})

export const deleteCompletedAction = () => ({type: 'deleteCompleted'})

export const changeTaskAction = (id, title) => ({type: 'change', payload: {id}, title})





