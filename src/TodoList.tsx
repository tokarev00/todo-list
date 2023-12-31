import React from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan  from "./EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material"
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void 
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (newTitle: string, todoListId: string) => void
    filter: FilterValuesType,
    id: string
}

export function TodoList(props: PropsType) {

    const addTask = (taskTitle: string) => {
        props.addTask(taskTitle, props.id);
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodoList = () => props.removeTodoList(props.id);
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.id);
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
                    props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id, props.id);    
                        const onChangeTitleHandler = (newTitle: string): void => {
                            props.changeTaskTitle(task.id, newTitle, props.id);
                        }
                        const onChangeStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
                            props.changeTaskStatus(task.id, event.target.checked, props.id);
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