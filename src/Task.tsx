import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import EditableSpan from "./EditableSpan";

type TaskPropsType = {
    todoListId: string;
    task: TaskType;
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const onRemoveHandler = () => dispatch(removeTaskAC(props.todoListId, props.task.id));

    const onChangeTitleHandler = useCallback((newTitle: string): void => {
        dispatch(changeTaskTitleAC(props.todoListId, props.task.id, newTitle));
    }, [dispatch, props.todoListId, props.task.id]);

    const onChangeStatusHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changeTaskStatusAC(props.todoListId, props.task.id, event.target.checked))
    }


    return (
        <div className={ props.task.isDone ? 'is-done' : '' } >
            <Checkbox onChange={ onChangeStatusHandler } checked = { props.task.isDone } />
            <EditableSpan title={ props.task.title } onChange = { onChangeTitleHandler } />
                <IconButton aria-label="delete" onClick = { onRemoveHandler } >
                    <Delete />
                </IconButton>
        </div>
                )
});
export default Task;