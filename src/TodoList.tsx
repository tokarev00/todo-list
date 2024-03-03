import React, { useCallback } from "react";
import {FilterValuesType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan  from "./EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material"
import { AppRootState } from "./state/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from "./state/todolists-reducer";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    filter: FilterValuesType,
    id: string
}

export const TodoList = React.memo(function(props: PropsType) {
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);
    const dispatch = useDispatch();
    const addTask = useCallback((taskTitle: string) => {
        dispatch(addTaskAC(props.id , taskTitle));
    }, [dispatch, props.id]);
    const onAllClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('all', props.id)), [dispatch, props.id]);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('active', props.id)), [dispatch, props.id]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('completed', props.id)), [dispatch, props.id]);
    const removeTodoList = useCallback(() => dispatch(removeTodoListAC(props.id)), [dispatch, props.id]);
    const changeTodoListTitle = useCallback((newTitle: string) => dispatch(changeTodoListTitleAC(newTitle, props.id)), [dispatch, props.id]);

    if (props.filter === "completed") {
        tasks = tasks.filter(task => task.isDone);
    }
    if (props.filter === "active") {
        tasks = tasks.filter(task => !task.isDone);
    }
    return (
        <div>
            <h3>
                <EditableSpan 
                    title={props.title} 
                    onChange={changeTodoListTitle} 
                />
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm initText='' onAddItem={addTask} />
            <div>
                {
                    tasks.map(task => <Task key={task.id} todoListId={props.id} task={task} />)
                }
            </div>
            <div>
                <Button 
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button 
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button 
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});
type TaskPropsType = {
    todoListId: string;
    task: TaskType;
}
const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const onRemoveHandler = () => dispatch(removeTaskAC(props.todoListId, props.task.id)); 

    const onChangeTitleHandler = useCallback((newTitle: string): void => {
        dispatch(changeTaskTitleAC(props.todoListId, props.task.id, newTitle));
    }, [dispatch, props.todoListId, props.task.id]);

    const onChangeStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        dispatch(changeTaskStatusAC(props.todoListId, props.task.id, event.target.checked))
    }


    return <div className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox onChange={onChangeStatusHandler} checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
        <IconButton aria-label="delete" onClick={onRemoveHandler}>
            <Delete />
        </IconButton>
    </div>
});