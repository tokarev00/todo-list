import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import {TaskType} from "../Task";
import { AddTodoListActionType, RemoveTodoListActionType } from "./todolists-reducer";

type AddTaskActionType = {
    type : 'ADD-TASK'
    todoListId: string
    title: string
}
type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListId: string
    taskId: string
    status: boolean
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    taskId: string
    title: string
}
type ActionTypes = AddTaskActionType |
                   RemoveTaskActionType |
                   ChangeTaskStatusActionType |
                   ChangeTaskTitleActionType |
                   AddTodoListActionType |
                   RemoveTodoListActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            const { todoListId: addId, title: addTitle } = action;
            const addTodoList = state[addId] || [];
            const newAddTask: TaskType = {
                id: v1(),
                title: addTitle,
                isDone: false
            };
            return {
                ...state,
                [addId]: [newAddTask, ...addTodoList]
            };
        case 'REMOVE-TASK':
            const { todoListId: removeTodoListId, taskId: removeTaskId } = action;
            const currentRemoveTodoList = state[removeTodoListId] || [];
            const updatedRemoveTodoList = currentRemoveTodoList.filter(task => task.id !== removeTaskId);

            return {
                ...state,
                [removeTodoListId]: updatedRemoveTodoList,
            };
        case 'CHANGE-TASK-STATUS':
            const { todoListId: statusTodoListId, taskId: statusTaskId, status: taskStatus } = action;
            const currentStatusTodoList = state[statusTodoListId] || [];
            const updatedStatusTodoList = currentStatusTodoList.map(task => {
                if (task.id === statusTaskId) {
                    return {
                        ...task,
                        isDone: taskStatus
                    };
                }
                return task;
            });
            return {
                ...state,
                [statusTodoListId]: updatedStatusTodoList
            };
        case 'CHANGE-TASK-TITLE':
            const { todoListId: titleTodoListId, taskId: titleTaskId, title } = action;
            const currentTitleTodoList = state[titleTodoListId] || [];
            const updatedTitleTodoList = currentTitleTodoList.map(task => {
                if (task.id === titleTaskId) {
                    return {
                        ...task,
                        title
                    };
                }
                return task;
            });
            return {
                ...state,
                [titleTodoListId]: updatedTitleTodoList
            };
        case 'ADD-TODOLIST' :
            return {
                [action.id]: [],
                ...state
            }
        case "REMOVE-TODOLIST":
            const newState = {...state};
            delete newState[action.id];
            
            return newState;
        default:
            return state;
    }
}
export const removeTaskAC = (todoListId: string, taskId: string) : RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todoListId,
        taskId
    }
}
export const addTaskAC = (todoListId: string, title: string) : AddTaskActionType  => {
    return {
        type: 'ADD-TASK',
        todoListId,
        title
    }
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: boolean) : ChangeTaskStatusActionType  => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todoListId,
        taskId,
        status
    }
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) : ChangeTaskTitleActionType  => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todoListId,
        taskId,
        title
    }
}