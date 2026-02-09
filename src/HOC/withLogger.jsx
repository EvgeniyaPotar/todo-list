import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function withLogger(WrappedComponent) {
    return (props) => {

        const { lastAction } = useSelector((store) => store.logger)

        useEffect(() => {
            if (lastAction) {
                switch (lastAction.type) {
                    case "add":
                        console.log("add task:", lastAction.payload);
                        break;

                    case "change_input":
                        console.log("change_input", lastAction.payload);
                        break;

                    case "start_edit":
                    case "change_edit_input":
                    case "finish_edit":
                        console.log("edit task", lastAction.payload);
                        break;

                    case "check":
                        console.log("check task", lastAction.payload);
                        break;

                    case "change":
                        console.log("change task", lastAction.payload);
                        break;

                    case "delete":
                        console.log("delete task", lastAction.payload);
                        break;

                    case "deleteCompleted":
                        console.log("delete completed tasks");
                        break;

                    default:
                        console.log("Component rendering:", WrappedComponent.name);
                }
            }
        },[lastAction])

        useEffect(() => {
            console.log(` ${WrappedComponent.name} rendered`);
        });

        return <WrappedComponent {...props} />;
    };
}
