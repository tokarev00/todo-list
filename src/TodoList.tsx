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
    removeTask: (id: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (TodoListId: string) => void
    filter: FilterValuesType,
    id: string
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
            props.addTask(newTaskTitle.trim(), props.id);
        }
        setNewTaskTitle('');
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        setError(null);
        if (event.key === "Enter") {
            addNewTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodoList = () => props.removeTodoList(props.id);
    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList} >REMOVE</button></h3>
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
                        const onRemoveHandler = () => props.removeTask(task.id, props.id)
                            const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
                                props.changeTaskStatus(task.id, event.target.checked, props.id);
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