import React from "react";
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

export function TodoList(props: PropsType) {
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);
    const dispatch = useDispatch();
    const addTask = (taskTitle: string) => {
        dispatch(addTaskAC(props.id , taskTitle));
    }
    const onAllClickHandler = () => dispatch(changeTodoListFilterAC('all', props.id));
    const onActiveClickHandler = () => dispatch(changeTodoListFilterAC('active', props.id));
    const onCompletedClickHandler = () => dispatch(changeTodoListFilterAC('completed', props.id));
    const removeTodoList = () => dispatch(removeTodoListAC(props.id));
    const changeTodoListTitle = (newTitle: string) => dispatch(changeTodoListTitleAC(newTitle, props.id));

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
                    tasks.map(task => {
                        const onRemoveHandler = () => dispatch(removeTaskAC(props.id, task.id));    
                        const onChangeTitleHandler = (newTitle: string): void => {
                            dispatch(changeTaskTitleAC(props.id, task.id, newTitle));
                        }
                        const onChangeStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
                            dispatch(changeTaskStatusAC(props.id, task.id, event.target.checked))
                        }


                        return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
                            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                <Delete />
                            </IconButton>
                        </div>

                    }
                    )
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
}