import React from 'react';
import { useState } from 'react';
import Todo from './Todo'
import Alert from './Alert'
const Main = () => {
    const input = React.createRef()
    const [text, setText] = useState('')
    const [todo, setTodo] = useState([])
    const [alert, setAlert] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)

    const showAlert = (type = '', msg = '') => {
        setAlert({ type, msg });
    };

    const handlSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            showAlert('danger', 'Please Enter Value')
            return;
        } else if (text && isEditing) {
            setTodo(
                todo.map(item => {
                    if (item.id === editId) {
                        return { ...item, title: text }
                    }
                    return item
                })
            )
            setText('')
            setEditId(null)
            setIsEditing(false)
            showAlert('success', 'item edited')
        } else {
            const newTodo = {
                id: new Date().getTime(),
                title: text,
            }
            setTodo([...todo, newTodo])
            showAlert('success', 'Item Added')
            setText('')
        }
    }
    const handleclear = () => {
        setTodo([])
        showAlert('danger', 'Todo List Cleared')
    }
    const handlDelete = (id) => {
        const newTodo = todo.filter(t => t.id !== id)
        setTodo([...newTodo])
        showAlert('danger', 'Item Deleted')
    }
    const handlEdit = (id) => {
        const specificItem = todo.find(i => i.id === id)
        setIsEditing(true)
        setEditId(id)
        setText(specificItem.title)
        input.current.focus()
    }

    const todoText = todo && todo.map(i => <Todo key={i.id} value={i} handlDelete={handlDelete} handlEdit={handlEdit} />)

    return (
        <div className='main'>
            <div className="todos">
                <form className="grocery-form" onSubmit={handlSubmit}>

                    {alert.msg && <Alert {...alert} removeAlert={showAlert} list={todo} />}

                    <h3>grocery bud</h3>
                    <div className="form-control">
                        <input
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            type="text"
                            ref={input}
                            className="grocery"
                            placeholder="add todos..." />
                        <button type="submit" className="submit-btn">{isEditing ? 'Edit' : 'Submit'}</button>
                    </div>
                </form>

                {
                    todo.length ?

                        <div className="grocery-container">
                            <div className="grocery-list">
                                {todoText}
                            </div>
                            <button className="clear-btn" onClick={handleclear}>clear items</button>
                        </div>

                        : null
                }

            </div>
        </div>
    );
};

export default Main;