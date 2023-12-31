import { userReducer } from "./user-reducer";



test( 'user reducer should increment only age', () => {
    const startState = {age: 28, childrenCount: 6, name: 'Vlad'};

    const endState = userReducer(startState, { type: "INCREMENT-AGE"});
    expect(endState.age).toBe(29);
    expect(endState.childrenCount).toBe(6);
});

test('user reducer shound increment only children count', () => {
    const startState = {age: 28, childrenCount: 6, name: 'Vlad'};

    const endState = userReducer(startState, { type: "INCREMENT-CHILDREN-COUNT"});
    expect(endState.age).toBe(28);
    expect(endState.childrenCount).toBe(7);
});

test('user reducer shound change name of user', () => {
    const startState = {age: 28, childrenCount: 6, name: 'Vlad'};
    const newName = 'Angelina';

    const endState = userReducer(startState, { type: "CHANGE-NAME", newName: 'Angelina'});
    
    expect(endState.name).toBe(newName);
});