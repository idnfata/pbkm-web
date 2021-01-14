import { Form, Formik, getIn } from 'formik';
import React, { useEffect, useState } from 'react'
import FormControl from '../../../../components/atoms/Form';
import { WrapperBasicInformation } from './employee-detail.elements';
import * as Yup from 'yup'
import { Button, Gap } from '../../../../components';
import { loginDataFields, loginDataValidationSchema } from './fields';
import Modal from 'react-modal';
import swal from 'sweetalert';
import API from '../../../../config/api';

Modal.setAppElement('#root');
const token = localStorage.getItem('token');

function getStyle(errors, touched, fieldName) {
    if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
      return {
        border: '1px solid red',
        borderLeft: '5px solid red'
      }
    }else if(!getIn(errors, fieldName) && getIn(touched, fieldName)){
      return {
        border: '1px solid green',

      }
    }
}





const BasicInformation = (props) => {
    const [formData, setFormData] = useState('');
    const [formFields, setFormFields] = useState([]);
    const [initialValues, setInitialValues] = useState({});
    const [schemaValidation, setSchemaValidation] = useState();
    const [modalFor, setModalFor] = useState('');
    const [isHaveLoginData, setIsHaveLoginData] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isAddOrEdit, setIsAddOrEdit] = useState('');
    const [message, setMessage] = useState('');

    // console.log(props);

    const handleClick = (e) => {
        // console.log(e.target.id);
        setFormData(e.target.id);
    }

    const handleClickDataLogin = (e) => {
        const id = e.target.id;
        setModalFor('Data Login')
        setFormFields(loginDataFields)
        setSchemaValidation(loginDataValidationSchema)
        if(id == 'buatDataLogin'){
            setInitialValues({
                name: props.employee.name,
                email: props.employee.email,
                password: '',
                repeat_password: '',
                role: 3,
            });
            setIsAddOrEdit('add');
            // console.log('tampilkan modal add data login')
            
        }else {
            setInitialValues({
                name: props.employee.name,
                email: props.employee.email,
                password: '',
                repeat_password: '',
                role: 3,

            });
            setIsAddOrEdit('edit');
            // console.log('tampilkan modal edit data login')

        }
        setModalIsOpen(true);
    }


    const onSubmit = values => {
        // console.log('Form data', values) 
        // console.log('Saved data', JSON.parse(JSON.stringify(values)))
        
        switch (modalFor) {
            case 'Data Login':
                if(isAddOrEdit == 'add'){
                    // console.log('request untuk menambah data login karyawan')
                    API.userCreate(token, values).then(res => {
                        // console.log(res)
                        setMessage('Data Login Berhasil Ditambahkan');
                        swal({
                            title: res.status,
                            text: message,
                            icon: "success",
                        });
                        setModalIsOpen(false);
                        setModalFor('');
                    }).catch(err => {
                        // console.log(err.message)
                        setMessage(err.message.data.message)
                        swal({
                            title: err.status,
                            text: err.response.data.message,
                            icon: "error",
                        });
                        setModalIsOpen(false);
                        setModalFor('');
                    });
                }else {
                    // console.log('request untuk mengedit data login karyawan')
                    API.userChangePassword(token, values).then(res => {
                        // console.log(res)
                        
                        swal({
                            title: res.data.status,
                            text: `Data Login ${values.email} Berhasil Diubah`,
                            icon: "success",
                        });
                        setModalIsOpen(false);
                        setModalFor('');
                    }).catch(err => {
                        swal({
                            title: err.status,
                            text: err.response.data.message,
                            icon: "error",
                        });
                        setModalIsOpen(false);
                        setModalFor('');
                    });
                }        
                break;
        
            default:
                break;
        }
    }


    const loginDataElement = (header, body, footer, status) =>  (
        <> 
            <div>
                <h3>{header}</h3>
            </div>
            <p className={status ? null : "tidak-punya-akun"}>
            {body}
            </p>
            <Gap height={15} />
            <div>
                <button className={status ? 'edit-button' : 'add-button'} id={status ? 'editDataLogin' : 'buatDataLogin'} onClick={handleClickDataLogin}>{footer}</button>
            </div>
        </>
    )
    
    

    useEffect(() => {
        API.employeeLoginData(token, props.employee.email).then(res => {
            // console.log(res)
            setIsHaveLoginData(true);
        }).catch(err => {
            console.log(err.response)
            setIsHaveLoginData(false);

        })
     

    }, [])
    // informasi dasar karyawan id {props.employee.id}
    function getStyle(errors, touched, fieldName) {
        if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
          return {
            border: '1px solid red',
            borderLeft: '5px solid red'
          }
        }else if(!getIn(errors, fieldName) && getIn(touched, fieldName)){
          return {
            border: '1px solid green',
    
          }
        }
      }
    return (
        <>
        <WrapperBasicInformation>


            <div className="data-basic">
                <div className="header-data">
                    <p>Data Dasar</p>
                    <button type="submit" className="edit-button-employee-detail">Edit</button>
                </div>
          
                <div className="content-data">
                    <div className="data-list">
                        <p>NIK</p>
                        <p>{props.employee.nik}</p>
                    </div>
                    <div className="data-list">
                        <p>Nama</p>
                        <p>{props.employee.name}</p>
                    </div>
                    <div className="data-list">
                        <p>Email</p>
                        <p>{props.employee.email}</p>
                    </div>
                    <div className="data-list">
                        <p>Jenis Kelamin</p>
                        <p>Laki-Laki</p>
                    </div>
                    <div className="data-list">
                        <p>Agama</p>
                        <p>Islam</p>
                    </div>
                    <div className="data-list">
                        <p>Tempat Lahir</p>
                        <p>Banjarmasin</p>
                    </div>
                    <div className="data-list">
                        <p>Tanggal Lahir</p>
                        <p>7 Januari 2000</p>
                    </div>
                    <div className="data-list">
                        <p>Departemen</p>
                        <p>{props.employee.division_name}</p>
                    </div>
                    <div className="data-list">
                        <p>Jabatan</p>
                        <p>{props.employee.position_name}</p>
                    </div>
                    <div className="data-list">
                        <p>Tim/Grup</p>
                        <p>{props.employee.group_name}</p>
                    </div>
                    <div className="data-list">
                        <p>Status</p>
                        <p>Kontrak</p>
                    </div>
                    <div className="data-list">
                        <p>Mulai Bekerja</p>
                        <p>{props.employee.start_work}</p>
                    </div>
           
                    
                {/* seperti di halaman dashboard list telat tu */}
                    
                </div>
            </div>



            <div className="data-contact">
                <div className="header-data">
                    <p>Data Contact</p>
                    <button type="submit" className="edit-button-employee-detail">Edit</button>
                </div>
           
                <div className="content-data">

                    
                </div>
                <div className="footer-data">
                    <button type="submit" onClick={handleClick} id="dataContact">Simpan</button>
                </div>
               
            </div>
            <div className="data-addresses">
                data alamat karyawan
            </div>
            <div className="data-family-members">
                data anggota keluarga karyawan
            </div>
            <div className="data-education-background">
                data riwayat pendidikan karyawan
            </div>
            <div className="data-work-experience">
                data pengalaman kerja karyawan
            </div>
            <div className="data-login">
                {
                    //jika tidak ada akun maka tampilkan tmabah akun, jika ada, maka tampilkan dibawah ini
                }
                {
                    // isHaveLoginData ?  haveLoginData : notHaveLoginData
                }
                {
                    isHaveLoginData ?  loginDataElement('Data Login', props.employee.email, 'Atur Ulang Password', true) : loginDataElement('Data Login', 'Karyawan ini belum mempunyai akun login', 'Buatkan Akun', false)
                }
               
                
            </div>
           
        </WrapperBasicInformation>
        <Modal 
                onRequestClose={() => setModalIsOpen(false)}
                isOpen={modalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                      },
                    content: {
                        border: '1px solid #222',
                        padding:0,
                        top: '25px',
                        left: '450px',
                        right: '450px',
                        bottom: '50px',
                    }
                }}
            >
                <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">{(isAddOrEdit == 'add') ? 'Tambah' : 'Edit' } {modalFor}</h2>
                    <button className="close-modal" onClick={() => setModalIsOpen(false)}>X</button>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={schemaValidation} onSubmit={onSubmit} >
                    {({errors, touched, isValid}) => (
                    <Form>
                        <div className="modal-body">
                            <div className="form-row">
                            {
                                formFields.map(field => (
                                    // console.log(field)
                                    <FormControl key={field.name}
                                        control={field.control}
                                        type={field.type}
                                        label={field.label}
                                        name={field.name}
                                        style={getStyle(errors, touched, field.name)}
                                        options={field.options}
                                        {...field}
                                    />
                                ))
                            }    
                            </div>  

                        </div>
                        <div className="modal-footer">
                            <Button buttonFull buttonColor='var(--green)' align="right" buttonHover type="submit" disabled={!isValid || props.isLoading} className={props.isLoading ? 'btnLoading' : null}>{(isAddOrEdit == 'add') ? 'Tambah' : 'Edit' }</Button>
                        </div>
                    </Form>
                    )}
                </Formik>

                </div>
            </Modal>
        </>
    )
}

export default BasicInformation
