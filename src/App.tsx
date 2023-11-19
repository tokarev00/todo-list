import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import AddItemForm from "./AddItemForm";
export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string] : Array<TaskType>
}
function App() {

    let todoListId1:string = v1();
    let todoListId2:string = v1();
    let [todoLists , setTodoLists] = useState<Array<TodoListType>>(  [
        {id: todoListId1, title: 'What to add?', filter: 'active'},
        {id: todoListId2, title: 'test', filter: 'all'}
    ])
    let [tasksOBJ, setTasksOBJ] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'testTitle', isDone: true},
        ],
        [todoListId2]: [
            {id: v1(), title: 'testTitle', isDone: true},
            {id: v1(), title: 'testTitle', isDone: false},
            {id: v1(), title: 'testTitle1', isDone: true},
        ]
    })
    function removeTask(id: string, todoListId: string) {
        let tasks: Array<TaskType> = tasksOBJ[todoListId];
        let filteredTasks = tasks.filter( task => task.id !== id);
        tasksOBJ[todoListId] = filteredTasks;
        setTasksOBJ({...tasksOBJ});
    }

    function addTask (title: string, todoListId: string) {
        let newTask:TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        let tasks = tasksOBJ[todoListId];
        let newTasks: Array<TaskType> = [newTask, ...tasks];
        tasksOBJ[todoListId] = newTasks;
        setTasksOBJ({...tasksOBJ});
    }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => todoListId === tl.id);
        if (todoList) {
            todoList.filter = value;
        }
        setTodoLists([...todoLists ]);
    }
    function changeTaskStatus (taskId: string, isDone : boolean , todoListId: string) : void {
       let task = tasksOBJ[todoListId].find((task) => task.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasksOBJ({...tasksOBJ});
    }
    function changeTaskTitle (taskId: string, newTitle: string, todoListId: string) : void {
        let task = tasksOBJ[todoListId].find((task) => task.id === taskId);
         if (task) {
             task.title = newTitle;
         }
         setTasksOBJ({...tasksOBJ});
     }
    function removeTodoList (todoListId: string) {
        let filteredLists = todoLists.filter(tl => tl.id !== todoListId);
        setTodoLists(filteredLists);
        delete tasksOBJ[todoListId];
        setTasksOBJ({...tasksOBJ});
    }
    function changeTodoListTitle (newTitle: string, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if(todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }
    function addTodoList (listTitle: string) {
        const todoList: TodoListType = {id: v1(),title: listTitle, filter: 'all' };
        setTodoLists([todoList, ...todoLists]);
        setTasksOBJ({...tasksOBJ, [todoList.id]: [] });
    }
    return (
        <div>
            <AddItemForm initText="New Todo List" onAddItem={addTodoList}/>
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasksOBJ[tl.id];

                    if (tl.filter === "completed"){
                        tasksForTodoList = tasksForTodoList.filter( task => task.isDone);
                    }
                    if (tl.filter === "active"){
                        tasksForTodoList = tasksForTodoList.filter( task => !task.isDone);
                    }
                    return  <TodoList
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={ tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                }  )
            }
        </div>);
}

export default App;
