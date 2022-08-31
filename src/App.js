import React, { useReducer } from 'react';
import './style.css'
import TodoApp from './Components/TodoApp';

export const AuthContext = React.createContext()

const initState = {
    todoList: [],
    isEditing: false,
    editId: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const { id, title } = action.payload
            state.todoList.push({ id, title })
            return {
                ...state,
            }
        case 'REMOVE_ITEM':
            const newTodo = state.todoList.filter(i => i.id !== action.payload.id)
            return {
                ...state,
                todoList: [...newTodo]
            }
        case 'IS_EDIT':
            return {
                ...state,
                isEditing: true,
                editId: action.payload.id
            }
        case 'EDIT_ITEM':
            const editItem = state.todoList.map(item => {
                if (item.id === state.editId) {
                    return { ...item, title: action.payload.title }
                }
                return item
            })
            return {
                ...state,
                todoList: [...editItem],
                isEditing: false,
                editId: null
            }
        case 'CLEAR_ITEMS':
            return {
                ...state,
                todoList: []
            }
        default:
            return state;
    }
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <TodoApp />
        </AuthContext.Provider>
    )
};

export default App;