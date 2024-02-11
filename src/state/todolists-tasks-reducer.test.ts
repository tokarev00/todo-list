import { TasksStateType, TodoListType } from "../AppWithRedux";
import { tasksReducer } from "./tasks-reducer";
import { addTodoListAC, todolistsReducer } from "./todolists-reducer";

test('IDs should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListType> = [];

    const action = addTodoListAC('title');

    const endTasksState: TasksStateType = tasksReducer(startTasksState, action);
    const endTodoListsState: Array<TodoListType> = todolistsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);

    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;


    expect(idFromTasks).toBe(action.id);
    expect(idFromTodoLists).toBe(action.id);
});