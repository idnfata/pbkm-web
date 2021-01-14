import React, { useEffect, useState } from 'react'

function FormTambahTugas(props) {
    const [tugas, setTugas] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const idTugas = props.value.id;
    const handleSubmit = e => {
        e.preventDefault();

       

        if(isEdit){
            // console.log('edit')
            const value = {
                id: idTugas,
                text: tugas
            }
            props.submitUpdate(value);

            setIsEdit(false)

        }else {
            // console.log('add')
            props.onSubmit({
                id: Math.floor(Math.random() * 10000),
                text: tugas
            });
        }
        setTugas('');

    }
    const handleChange = e => {
        setTugas(e.target.value);
        if(e.target.value == ''){
            setIsEdit(false)
        }
    }

 
 
    
    useEffect(() => {
        setIsEdit(false)

        if(props.value.id){
            // console.log(props.value)
            setIsEdit(true)
            setTugas(props.value.value)
            document.querySelector(".form-tugas").focus();

        }else {
            setIsEdit(false)
        }
      
    },[props.value])

    return (<>
        <form className="tambah-tugas" onSubmit={handleSubmit}>
            <input type="text" className="form-tugas" placeholder="Tambahkan tugas baru..." name="text"
                value={tugas}
                onChange={handleChange}
            />
            <button className="tombol-tambah-tugas">{isEdit ? 'Edit' : 'Tambah'}</button>
        </form>
    </>)

 
   
}

export default FormTambahTugas
