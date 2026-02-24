import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function withLogger(WrappedComponent) {
    return (props) => {

        const lastAction = useSelector((store) => store.logger.lastAction)

        useEffect(() => {
            if (lastAction) {
                switch (lastAction.type) {
                    case 'tasks/addTask':
                        console.log('Добавлена задача:', lastAction.payload)
                        break

                    case 'EditTaskInput/startEdit':
                    case 'EditTaskInput/changeEditInput':
                    case 'EditTaskInput/finishEdit':
                        console.log(
                            'Редактирование:',
                            lastAction.type,
                            lastAction.payload
                        )
                        break

                    case 'tasks/checkTask':
                        console.log(
                            'Статус задачи изменен:',
                            lastAction.payload
                        )
                        break

                    case 'tasks/changeTask':
                        console.log('Текст задачи изменен:', lastAction.payload)
                        break

                    case 'tasks/deleteTask':
                        console.log('Задача удалена:', lastAction.payload)
                        break

                    case 'tasks/deleteCompletedTasks':
                        console.log('Удалены все выполненные задачи')
                        break

                }
            }
        },[lastAction])

        useEffect(() => {
            console.log(` ${WrappedComponent.name} rendered`);
        });

        return <WrappedComponent {...props} />;
    };
}
