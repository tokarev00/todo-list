import { TasksStateType } from "../App"
import { tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from "./tasks-reducer"
import { addTodoListAC, removeTodoListAC } from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        ['todoListId1']: [
            { id: '1', title: 'testTitle', isDone: true },
        ],
        ['todoListId2']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '2', title: 'testTitle', isDone: false },
            { id: '3', title: 'testTitle1', isDone: true },
        ]
    }
    const endState = tasksReducer(startState, removeTaskAC('todoListId2', '2'));

    expect(endState['todoListId1'].length).toBe(1);
    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId2'].every(t => t.id !== '2')).toBeTruthy();
});


test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        ['todoListId1']: [
            { id: '1', title: 'testTitle', isDone: true },
        ],
        ['todoListId2']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '2', title: 'testTitle', isDone: false },
            { id: '3', title: 'testTitle1', isDone: true },
        ]
    }
    const newTaskTitle = 'test title'
    const endState = tasksReducer(startState, addTaskAC('todoListId2', newTaskTitle));


    expect(endState['todoListId1'].length).toBe(1);
    expect(endState['todoListId2'].length).toBe(4);
    expect(endState['todoListId2'][0].id).toBeDefined();
    expect(endState['todoListId2'][0].title).toBe(newTaskTitle);
    expect(endState['todoListId2'][0].isDone).toBe(false);
});

test('status of specified task should be correctly changed', () => {

    const startState: TasksStateType = {
        ['todoListId1']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '1', title: 'testTitle', isDone: true }
        ],
        ['todoListId2']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '2', title: 'testTitle', isDone: false },
            { id: '3', title: 'testTitle1', isDone: true },
        ]
    }

    const newTaskStatus = false;
    const endState = tasksReducer(startState, changeTaskStatusAC('todoListId2', '2', newTaskStatus));


    expect(endState['todoListId2'][1].isDone).toBeFalsy();
    expect(endState['todoListId1'][1].isDone).toBeTruthy();
});

test('title of specified task should be correctly changed', () => {
    
    const startState: TasksStateType = {
        ['todoListId1']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '1', title: 'testTitle', isDone: true }
        ],
        ['todoListId2']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '2', title: 'testTitle', isDone: false },
            { id: '3', title: 'testTitle1', isDone: true },
        ]
    }

    const newTaskTitle = 'testTitle';
    const endState = tasksReducer(startState, changeTaskTitleAC('todoListId2', '2', newTaskTitle));


    expect(endState['todoListId2'][1].title).toBe(newTaskTitle);
    expect(endState['todoListId1'][1].title).toBe('testTitle');
});

test('new array should be added when new todo list is added', () => {
    const startState: TasksStateType = {
        ['todoListId1']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '1', title: 'testTitle', isDone: true }
        ],
        ['todoListId2']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '2', title: 'testTitle', isDone: false },
            { id: '3', title: 'testTitle1', isDone: true },
        ]
    }

    const endState = tasksReducer(startState, addTodoListAC('new todo list title'));
    
    const keys = Object.keys(endState);
    const newKey = keys.find(key => key !== 'todoListId1' && key !== 'todoListId2')
    if(!newKey) {
        throw new Error('New key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with with todoListId should be deleted', () => {
    const startState: TasksStateType = {
        ['todoListId1']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '1', title: 'testTitle', isDone: true }
        ],
        ['todoListId2']: [
            { id: '1', title: 'testTitle', isDone: true },
            { id: '2', title: 'testTitle', isDone: false },
            { id: '3', title: 'testTitle1', isDone: true },
        ]
    }

    const endState = tasksReducer(startState, removeTodoListAC('todoListId2'));


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todoListId2']).toBeUndefined();
});