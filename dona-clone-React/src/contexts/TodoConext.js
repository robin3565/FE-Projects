import React, { createContext, useContext, useEffect, useReducer } from 'react'

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

export const useTodoState = () => {
    return useContext(TodoStateContext);
}

export const useTodoDispatch = () => {
    return useContext(TodoDispatchContext);
}

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_STORED':
            return action.value
        case 'CREATE':
            return state.concat(action.todo);
        case 'CLEAR':
            return state.map(item =>
                item.id === action.id ? { ...item, done: !item.done } : item);
        case 'REMOVE':
            return state.filter(item =>
                item.id !== action.id)
        case 'UPDATE':
            return state.map(item =>
                item.id === action.id ? { ...item, text: action.text } : item);
        default:
            return state;
    }

}

const initialState = [];

export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('todoState'))) {
            dispatch({
                type: "INIT_STORED",
                value: JSON.parse(localStorage.getItem('todoState'))
            });
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("todoState", JSON.stringify(state));
    }, [state])

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}