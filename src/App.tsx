import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
export type FilterValuesType = 'all' | 'completed' | 'active';
function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'testTitle', isDone: true},
        {id: 2, title: 'testTitle', isDone: true},
        {id: 3, title: 'testTitle', isDone: false},
        {id: 4, title: 'testTitle1', isDone: true},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: number) {
        let filteredTasks = tasks.filter( task => task.id !== id);
        setTasks(filteredTasks);
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    let tasksForTodoList = tasks;

    if (filter === "completed"){
        tasksForTodoList = tasks.filter( task => task.isDone === true);
    }
    if (filter === "active"){
        tasksForTodoList = tasks.filter( task => task.isDone === false);
    }

    return (
        <div>
            <TodoList
                title='What to add?'
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>);
}


export default App;
