import React, {useState} from "react";
import {FilterValuesType} from "./App";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('New Task');

    const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTaskTitle(event.target.value);
    }
    const addNewTask = ():void => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter") {
            addNewTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    onChange={inputOnChange}
                    onKeyPress={onKeyPressHandler}
                    value={newTaskTitle}/>
                <button onClick={addNewTask}>+</button>

            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id)
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>

                    }
                    )
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}