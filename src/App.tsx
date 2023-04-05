import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
export type FilterValuesType = 'all' | 'completed' | 'active';
function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'testTitle', isDone: true},
        {id: v1(), title: 'testTitle', isDone: true},
        {id: v1(), title: 'testTitle', isDone: false},
        {id: v1(), title: 'testTitle1', isDone: true},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let filteredTasks = tasks.filter( task => task.id !== id);
        setTasks(filteredTasks);
    }
    function addTask (title: string) {
        let newTask = {
            id: v1(),
            title,
            isDone: false
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    function changeStatus (taskId: string, isDone : boolean ) : void {
       let task = tasks.find((task) => task.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }
    let tasksForTodoList = tasks;

    if (filter === "completed"){
        tasksForTodoList = tasks.filter( task => task.isDone);
    }
    if (filter === "active"){
        tasksForTodoList = tasks.filter( task => !task.isDone);
    }

    return (
        <div>
            <TodoList
                title='What to add?'
                tasks={tasksForTodoList}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeStatus}
                filter={ filter}
            />
        </div>);
}


export default App;
