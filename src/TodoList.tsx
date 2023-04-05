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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('New Task');
    const [error, setError] = useState<string | null>(null);
    const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewTaskTitle(event.target.value);
    }
    const addNewTask = (): void => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required');
        }else {
            setError(null);
            props.addTask(newTaskTitle.trim());
        }
        setNewTaskTitle('');
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        setError(null);
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
                    value={newTaskTitle}
                    className={error ? 'error' : ''}
                />
                <button onClick={addNewTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id)
                            const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
                                props.changeTaskStatus(task.id, event.target.checked);
                            }
                        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
                            <span>{task.title}</span>
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