import { v1 } from "uuid";
import { todolistsReducer,
    removeTodoListAC,
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC
} from "./todolists-reducer";
import { TodoListType } from "../AppWithRedux";

test('correct todolist should be removed', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'},
    ]

    const newTodoListTitle: string = 'test';

    const endState = todolistsReducer(startState, addTodoListAC(newTodoListTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should changed its name', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'},
    ]
    const newTitle = 'New Test Title';

    const endState = todolistsReducer(startState, changeTodoListTitleAC(newTitle, todolistId1));

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe('what to buy');
});
test('correct filter of todolist should be changed', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'},
    ]
    const newFilter = 'completed';

    const endState = todolistsReducer(startState, changeTodoListFilterAC(newFilter, todolistId1));

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe('all');
});