import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Button, Col, FormControl, Gap, Icon, Row, Table } from '../../../components';
import { Formik, Form, getIn } from 'formik'
import HRMenuSetting from './header'
import Modal from 'react-modal';
import { iconAdd } from '../../../assets';
import swal from 'sweetalert';
import { companyInfoValidationSchema, branchValidationSchema, divisionValidationSchema, branchFields, divisionFields } from './fields';
import API from '../../../config/api';

Modal.setAppElement('#root');

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

const saveCompanyInfo = () => {
    console.log(`save`);
}

const createData = async data => {
    // console.log('Form data', data)
    console.log('Saved data', JSON.parse(JSON.stringify(data)))
    // props.createUser(token, data).then(res => {
    //     // console.log(res);
    //     swal({
    //         title: res.status,
    //         text: res.message,
    //         icon: "success",
    //     });
    //     history.goBack();

    // }).catch(err => {
    //     console.log(err);
    //     swal({
    //         title: err.status,
    //         text: err.message,
    //         icon: "error",
    //     });

    // });
  
  }

const HRSettingMenu = (props) => {
    const token = localStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [totalTableData, setTotalTableData] = useState(0);
    const [position, setPosition] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageName, setPageName] = useState('Informasi Perusahaan');
    const [location, setLocation] = useState('/setting/company/info');
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [formFields, setFormFields] = useState([]);
    const [schemaValidation, setSchemaValidation] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const setPageSetting = (e) => {
        e.stopPropagation();
        const link = e.target.getAttribute('data');
        const text = e.target.getAttribute('text');
        // console.log(page)
        setPageName(text);
        setLocation(link);
        
    
    }

    const handleEdit = (row) => {
        console.log(`edit data dengan id, ${row.id}`)
    
        // const goTo = `${pageName}/edit/${row.id}`;
        // // console.log(goTo);
        // history.push(goTo, {
        //     row : row
        // })
    }
    const handleDelete = (row) => {
        console.log(`delete data dengan id, ${row.id}`)
        // setLoading(true);
        // const goTo = `${props}/delete/${row.id}`;
        
    
    }

    const branchColumns = [
        {Header: 'No',
            Cell: (row) => {
                return <div>{row.index+1}</div>;
            }
        },
        {Header: 'Kode', accessor: 'code'},
        {Header: 'Nama', accessor: 'name'},
        {Header: 'Longitude', accessor: 'longitude'},
        {Header: 'Latittude', accessor: 'latittude'},
        {Header: 'Tanggal Payroll', accessor: 'payroll_start_date'},
        {Header: 'Jenis', accessor: 'type'},
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];
    const divisionColumns = [
        {Header: 'No',
            Cell: (row) => {
                return <div>{row.index+1}</div>;
            }
        },
        {Header: 'Kode', accessor: 'code'},
        {Header: 'Nama', accessor: 'name'},
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];
    useEffect(() => {
        setLoading(true);
        setCurrentPage(currentPage);
        switch (pageName) {
            case 'Informasi Perusahaan':
                // setTableColumns(columnsCompanyInfo)
                setInitialValues({
                    name: '',
                    description: '',
                    email: '',
                    telp: '',
                    website: '',
                    logo: ''
                })
                setSchemaValidation(companyInfoValidationSchema)
                console.log(`request ke : ${pageName}`)
                break;
            case 'Cabang':
                setTotalPage(0);
                setTableColumns(branchColumns);
                setInitialValues({
                    code: '',
                    name: '',
                    longitude: '',
                    latittude: '',
                    payroll_start_date: '',
                    type: ''
                })
                setFormFields(branchFields)
                setSchemaValidation(branchValidationSchema)
                API.getBranch(token, currentPage, perPage, searchTerm).then((res) => {
                    setTableData(res.data.data)
                    setTotalPage(res.data.last_page);
                    setTotalTableData(res.data.total);
                    setPosition((currentPage - 1) * perPage)
                    setMessage('success get data branch');
                    setLoading(false);
                }).catch(err => {
                    // console.log(err.response.data.message);
                    setMessage(err.response.data.message);
                    setLoading(false);
                })
                break;
            case 'Departemen':
                setTotalPage(0);
                setTableColumns(divisionColumns);
                setInitialValues({
                    code: '',
                    name: '',
                })
                setFormFields(divisionFields)
                setSchemaValidation(divisionValidationSchema)
                API.getDivision(token, currentPage, perPage, searchTerm).then((res) => {
                    setTableData(res.data.data)
                    setTotalPage(res.data.last_page);
                    setTotalTableData(res.data.total);
                    setPosition((currentPage - 1) * perPage)
                    setMessage('success get data division');
                    setLoading(false);
                }).catch(err => {
                    // console.log(err.response.data.message);
                    setMessage(err.response.data.message);
                    setLoading(false);
                })
                break;
            case 'Jabatan':
                console.log(`request ke : ${pageName}`)
                break;
            case 'Lokasi':
                console.log(`request ke : ${pageName}`)
                break;
            case 'Shift':
                console.log(`request ke : ${pageName}`)
                break;
            case 'Tim/Grup':
                console.log(`request ke : ${pageName}`)
                break;
            case 'Hari Libur':
                console.log(`request ke : ${pageName}`)
                break;
            
            default:
                break;
        }
    }, [pageName, location, currentPage, perPage]);
    return (
        <>
            <HRMenuSetting setPageSetting={setPageSetting} location={location} pageName={pageName} />

            {(pageName == 'Informasi Perusahaan') ? <>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={schemaValidation} onSubmit={saveCompanyInfo} >
                    {({errors, touched, isValid}) => (
                    <Form>
                                <FormControl control="input" type="text" label="Nama Perusahaan" name="name"
                                style={getStyle(errors, touched, 'name')}
                                />
                            <Gap height={30} />
                            <Button shadowSetting buttonFull buttonColor='#48c774' buttonHover type="submit" disabled={!isValid || props.isLoading} className={props.isLoading ? 'btnLoading' : null}>{props.isLoading ? 'Loading...' : 'Save'}</Button>
                        </Form>
                        
                    )}
            </Formik>
            </> : //else, tampilkan datatable
            <Row>
                <Col>
                   <div className="table-control">
                    <button type="submit" className="add-button" onClick={() => setAddModalIsOpen(true)}>
                        <Icon icon={iconAdd} color="var(--white)" />
                        Add New
                    </button>
                   </div>
                   {(tableData.length > 0) ? 
                   <>
                        <p>Table {pageName}</p>
                        <p>request untuk get data tablenya</p>
                        <p>apa apa aja kolom tabelnya, definisikan</p>
                        <Table type="dataTable" tableData={tableData} tableColumns={tableColumns} />
                    </>
                   
                    : 
                    <>
                        <Row>
                            <h1>Data tidak ditemukan.</h1>
                        </Row>
                    </>
                   }

                    
                </Col>
            </Row>
            }
            

            
            <Modal 
                onRequestClose={() => setAddModalIsOpen(false)}
                isOpen={addModalIsOpen}
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
                    <h2 className="modal-title">Tambah {pageName}</h2>
                    <button className="close-modal" onClick={() => setAddModalIsOpen(false)}>X</button>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={schemaValidation} onSubmit={createData} >
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
                                    />
                                ))
                            }    
                            </div>  

                        </div>
                        <div className="modal-footer">
                            <Button buttonFull buttonColor='var(--green)' align="right" buttonHover type="submit" disabled={!isValid || props.isLoading} className={props.isLoading ? 'btnLoading' : null}>{props.isLoading ? 'Loading...' : 'Tambah'}</Button>
                        </div>
                    </Form>
                    )}
                </Formik>

                </div>
            </Modal>
        </>
    )
}

const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
    isLoading: state.isLoading

})
  
  
const reduxDispatch = (dispatch) => ({
    loading : (data) => dispatch(setLoading(data)),

    

})
export default connect(reduxState, reduxDispatch)(HRSettingMenu)