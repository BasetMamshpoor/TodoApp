import React, { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../App';
import Alert from './Alert';
import Todo from './Todo';

const TodoApp = () => {
    const { state, dispatch } = useContext(AuthContext)
    const { todoList, isEditing } = state
    const [inputValue, setInputvalue] = useState('')
    const [alert, setAlert] = useState({})
    const showAlert = (type = '', text = '', show = false) => {
        setAlert({ type, text, show })
    }

    const handlSubmit = (e) => {
        e.preventDefault()
        if (!inputValue) {
            showAlert('danger', 'Please Enter Value', true)
        } else if (inputValue && isEditing) {
            dispatch({
                type: 'EDIT_ITEM',
                payload: { title: inputValue }
            })
            setInputvalue('')
            showAlert('success', 'Todo Changed', true)
        } else {
            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    id: new Date().getTime(),
                    title: inputValue
                }
            })
            showAlert('success', 'Item Added', true)
            setInputvalue('')
        }
    }
    const handlEdit = (id) => {
        const edit = todoList.find(i => i.id === id)
        setInputvalue(edit.title)
        dispatch({
            type: 'IS_EDIT',
            payload: { id }
        })
    }
    const handlDelete = (id) => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: { id }
        })
        showAlert('danger', 'Todo Deleted', true)
    }
    const newTodos = todoList && todoList.map(i => {
        return <Todo key={i.id} value={i} handlEdit={handlEdit} handlDelete={handlDelete} />
    })
    return (
        <div className='main'>
            <form className='grocery-form' onSubmit={handlSubmit}>

                {alert.show && <Alert type={alert.type} msg={alert.text} removeAlert={showAlert} list={todoList} />}

                <h3>grocery bud</h3>
                <div className="form-control">
                    <input
                        placeholder='Add todo'
                        value={inputValue}
                        onChange={(e) => setInputvalue(e.target.value)}
                        className='grocery'
                        type="text" />
                    <button className='submit-btn' type="submit">{isEditing ? 'Edit' : 'Submit'}</button>
                </div>
            </form>
            {
                todoList.length ?

                    <div className="grocery-container">
                        <div className="grocery-list">
                            {newTodos}
                        </div>
                        <button className="clear-btn" onClick={() => dispatch({ type: 'CLEAR_ITEMS', })}>Clear Items</button>
                    </div>

                    : null
            }
        </div>
    );
};

export default TodoApp;