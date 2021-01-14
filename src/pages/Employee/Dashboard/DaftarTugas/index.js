import React, { useState } from 'react'
import { WrapperDaftarTugas, ListTugas } from '../dashboard-employee.elements'
import FormTambahTugas from './FormTambahTugas'

//nanti refactor kode ini supaya bisa digunakan di mana aja
const DaftarTugas = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState({});
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });



    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodo = [todo, ...todos];

        setTodos(newTodo);
        // console.log(todo, ...todos)
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        })

        setTodos(updatedTodos);
    }

    const updateTodo = (todoId, newValue) => {
        // console.log(newValue)

        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    }

    const submitUpdate = value => {
        updateTodo(value.id, value);
        setEdit({
            id: null,
            value: ''
        })
    }

    if(edit.id) {
        // console.log(`isi form tambah itu dengan ${edit}`);
        setText(edit)
        setEdit({
            id: null,
            value: ''
        })
    }

    const removeTodo = id => {
        // console.log(`hapus ${id}`)
        const removeArr = [...todos.filter(todo => todo.id !== id)];

        setTodos(removeArr);
    }
    const handleEdit = tugas => {
        setEdit(tugas);

    }



    return (
        <>
        <FormTambahTugas onSubmit={addTodo} value={text} submitUpdate={submitUpdate} />

        <WrapperDaftarTugas>
                {
                    todos.map((todo, index) => (
                        <ListTugas className={todo.isComplete ? 'left-cont complete' : 'left-cont'} key={index} >
                            <div onClick={() => completeTodo(todo.id)}>
                                {todo.text}
                            </div>
                            <div className="icons">
                                <div onClick={() => handleEdit({id: todo.id, value: todo.text})} className="edit-button">Edit</div>
                                <div onClick={() => removeTodo(todo.id)}
                                    className="delete-button"
                                >Hapus</div>
                            </div>
                        </ListTugas>

                    ))
                }
                {/* <div className="left-cont">
                    <input type="checkbox" id="check-1" name="" />
                    <label for="check-1"></label>   
                    <span>Tugas 1</span>
                </div>
                <span className="hapus-tugas">Hapus</span> */}
        </WrapperDaftarTugas>
        </>
    )
}

export default DaftarTugas
