import React from "react";
import { Provider } from "react-redux";
import { StoryFn } from "@storybook/react/*";
import { v1 } from "uuid";
import { legacy_createStore as createStore} from 'redux';
import { TasksStateType, TodoListType } from "../AppWithRedux";
import { AppRootState, rootReducer } from "../state/store";

const initialGlobalState: {todolists: TodoListType[], tasks: TasksStateType} = {
   todolists: [
       {id: 'todoListId1', title: 'Todo list 1', filter: 'active'},
       {id: 'todoListId2', title: 'Todo list 2', filter: 'active'}
   ],
   tasks: {
       todoListId1 : [
           {id: v1(), title: 'task 1', isDone: false},
           {id: v1(), title: 'task 2', isDone: true},
       ],
       todoListId2: [
           {id: v1(), title: 'task 1', isDone: false},
           {id: v1(), title: 'task 2', isDone: true},
           {id: v1(), title: 'task 3', isDone: true},
       ]
   }
}
/*@ts-ignore*/
export const store = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator  = (Story : StoryFn) => (
    <Provider store={store}>
       <Story/>
    </Provider>
  );