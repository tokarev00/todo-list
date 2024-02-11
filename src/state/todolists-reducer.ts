import { TodoListType } from "../AppWithRedux"
import { v1 } from "uuid";
import { FilterValuesType } from "../AppWithRedux";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string,
    id: string
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

const initialState: Array<TodoListType> = [];

export const todolistsReducer  = (state: Array<TodoListType> = initialState, action: ActionTypes) : Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todoList) =>todoList.id !== action.id);
        case 'ADD-TODOLIST':
            return [
                { 
                    id: action.id,
                    title:action.title,
                    filter: 'all'
                }, 
                ...state
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
            return state;
    }
}

export const removeTodoListAC = (id: string) : RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    }
}
export const addTodoListAC = (title: string) : AddTodoListActionType => {
    const id = v1(); 
    return {
        type: 'ADD-TODOLIST',
        title,
        id
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