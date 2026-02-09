export const  startEditAction = (id,title) => ({type: 'start_edit', payload: {id,title}})

export const  changeEditInputAction = (title) => ({type: 'change_edit_input', payload: title})

export const  finishEditAction = () => ({type: 'finish_edit'})

