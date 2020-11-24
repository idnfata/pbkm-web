import React, { useEffect, useState } from 'react'

const CreateMaster = (props) => {
    // console.log(props);
    const pageName = props.match.params.table;
    const tableName = pageName.split('-').join('_') + 's';
    // console.log(tableName);
    const [formField, setFormField] = useState();
    useEffect(() =>{
        switch (tableName) {
            case 'users':
                setFormField('form field users')
                break;
            case 'user_roles':
                setFormField('form field user_roles')
                break;
        
            default:
                break;
        }
    },[])
    
    return (
        <div>
            halaman untuk input data master {formField}
        </div>
    )
}

export default CreateMaster
