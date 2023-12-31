import { TodoListType } from "../App"
import { v1 } from "uuid";
import { FilterValuesType } from "../App";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    id: string
}
export type ChangeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    newFilter: FilterValuesType
    id: string
}
type ActionTypes = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleType | ChangeTodoListFilterType;

export const todolistsReducer  = (state: Array<TodoListType>, action: ActionTypes) : Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todoList) =>todoList.id !== action.id);
        case 'ADD-TODOLIST':
            return [...state,
                { 
                    id: v1(),
                    title:action.title,
                    filter: 'all'
                }   
            ];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todoList => (todoList.id === action.id ? { ...todoList, title: action.newTitle } : todoList));
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todoList =>
                todoList.id === action.id
                    ? { ...todoList, filter: action.newFilter }
                    : todoList
            );   
        default:
            // @ts-ignore
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const removeTodoListAC = (id: string) : RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    }
}
export const addTodoListAC = (title: string) : AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title
    }
}
export const changeTodoListTitleAC = (newTitle: string, id: string) : ChangeTodoListTitleType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        newTitle,
        id
    }
}
export const changeTodoListFilterAC = (newFilter: FilterValuesType, id: string) : ChangeTodoListFilterType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        newFilter,
        id
    }
}