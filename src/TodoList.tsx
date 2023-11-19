import React from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan  from "./EditableSpan";

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
                <button onClick={removeTodoList}>REMOVE</button>
            </h3>
            <AddItemForm initText='' onAddItem={addTask} />
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id, props.id);    
                        const onChangeTitleHandler = (newTitle: string): void => {
                            props.changeTaskTitle(task.id, newTitle, props.id);
                        }
                        const onChangeStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
                            props.changeTaskStatus(task.id, event.target.checked, props.id);
                        }


                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" onChange={onChangeStatusHandler} checked={task.isDone}/>
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
                            <button onClick={onRemoveHandler}>x</button>
                        </li>

                    }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}