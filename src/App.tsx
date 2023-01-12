import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
let tasks1: Array<TaskType> = [
    {id: 1, title: 'testTitle', isDone: true},
    {id: 2, title: 'testTitle', isDone: true},
    {id: 3, title: 'testTitle', isDone: false},
]
let tasks2: Array<TaskType> = [
    {id: 1, title: 'testTitle2', isDone: false },
    {id: 2, title: 'testTitle2', isDone: true},
    {id: 3, title: 'testTitle2', isDone: true},
]
function App() {
    return (
        <div>
            <TodoList title='What to add?' tasks={tasks1}/>
            <TodoList title='test3' tasks={tasks2}/>
        </div>);
}


export default App;
