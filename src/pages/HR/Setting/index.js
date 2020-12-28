import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Button, Col, FormControl, Gap, Icon, Row, Table } from '../../../components';
import { Formik, Form, getIn } from 'formik'
import HRMenuSetting from './header'
import Modal from 'react-modal';
import { iconAdd } from '../../../assets';
import swal from 'sweetalert';
import { companyInfoValidationSchema, branchValidationSchema, divisionValidationSchema, positionValidationSchema, branchFields, divisionFields, positionFields } from './fields';
import API from '../../../config/api';
import { createBranch, editBranch } from '../../../config/redux/action/hr';
import { useDebounce } from '../../../utils/helpers/useDebounce';
import { Link } from 'react-router-dom';

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

const saveCompanyInfo = () => {
    console.log(`save`);
}




const HRSettingMenu = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const perPageList = [
        {label: "5", value: 5},
        {label: "10", value: 10},
        {label: "25", value: 25},
        {label: "50", value: 50},
    ];
    const [totalTableData, setTotalTableData] = useState(0);
    const [position, setPosition] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageName, setPageName] = useState('Informasi Perusahaan');
    const [location, setLocation] = useState('/setting/company/info');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isAddOrEdit, setIsAddOrEdit] = useState('');
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
    const prevButton = () => {
        setCurrentPage(Number(currentPage - 1));
    }
    const nextButton = () => {
        setCurrentPage(Number(currentPage + 1));        

    }
    const pageNumberClick = (e) => {
        // setCurrentPage(e => e.target.id)
        setCurrentPage(Number(e.target.id));
    }
    const changePerPage = (e) => {
        setPerPage(Number(e.target.value))
    }

    const pageNumbers = [];
    
    let i = 0;
    do {
        i++;
        // console.log(`halaman sekarang,`, i);
        pageNumbers.push(i);
    } while(i < totalPage)

    const renderPageNumbers = pageNumbers.map(number => {
        return (
          <a
            key={number}
            id={number}
            onClick={pageNumberClick}
            className={currentPage == number ? 'active' : ''}
          >
            {number}
          </a>
        );
      });
    // console.log(COLUMNS);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    
    const handleSubmit = async data => {
        // console.log('Form data', data)
        // console.log('Saved data', JSON.parse(JSON.stringify(data)))
        // console.log(data.sendTo);
        switch (pageName) {
            case 'Cabang':
                if(isAddOrEdit == 'add') {
                    props.createBranch(token, data).then(res => {
                        // console.log(res);
                        swal({
                            title: res.status,
                            text: res.message,
                            icon: "success",
                        });
                        setModalIsOpen(false);
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
        
                    }).catch(err => {
                        // console.log(err);
                        swal({
                            title: err.status,
                            text: err.message,
                            icon: "error",
                        });
                        setModalIsOpen(false)
    
                    });
                }else {
                    // console.log(data.id);
                    props.editBranch(token, data).then(res => {
                        // console.log(res);
                        swal({
                            title: res.status,
                            text: res.message,
                            icon: "success",
                        });
                        setModalIsOpen(false);
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
        
                    }).catch(err => {
                        // console.log(err);
                        swal({
                            title: err.status,
                            text: err.message,
                            icon: "error",
                        });
                        setModalIsOpen(false)
    
                    });
                }
                
                
                break; 
            case 'Departemen':
                if(isAddOrEdit == 'add') {
                    API.addDivision(token, data).then(res => {
                        console.log(res);
                        swal({
                            title: res.data.status,
                            text: res.data.message,
                            icon: "success",
                        });
                        setModalIsOpen(false);
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
        
                    }).catch(err => {
                        // console.log(err);
                        swal({
                            title: err.status,
                            text: err.message,
                            icon: "error",
                        });
                        setModalIsOpen(false)
    
                    });
                }else {
                    // console.log(data.id);
                    API.editDivision(token, data).then(res => {
                        // console.log(res);
                        swal({
                            title: res.data.status,
                            text: res.data.message,
                            icon: "success",
                        });
                        setModalIsOpen(false);
                        API.getDivision(token, currentPage, perPage, searchTerm).then((res) => {
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
        
                    }).catch(err => {
                        // console.log(err);
                        swal({
                            title: err.status,
                            text: err.message,
                            icon: "error",
                        });
                        setModalIsOpen(false)
    
                    });
                }
                break;
            case 'Jabatan':
                console.log('Call API add Jabatan');
                break;
            case 'Status Kerja':
                console.log('Call API add Status Kerja');
                break;
            case 'Lokasi':
                console.log(`Call API add Lokasi`)
                break;
            case 'Shift':
                console.log(`Call API add Shift`)
                break;
            case 'Tim/Grup':
                console.log(`Call API add Tim/Grup`)
                break;
            case 'Hari Libur':
                console.log(`Call API add Hari Libur`)
                break;
            
        
            default:
                break;
        }
     
      
      }
 

    const handleAdd = () => {

        switch (pageName) {
            case 'Cabang':
                setIsAddOrEdit('add');
                setInitialValues({
                    code: '',
                    name: '',
                    longitude: '',
                    latittude: '',
                    payroll_start_date: '',
                    type: '',
                })
                setModalIsOpen(true)
          
                break; 
            case 'Departemen':
                setIsAddOrEdit('add');
                setInitialValues({
                    code: '',
                    name: '',
                })
                setModalIsOpen(true)
          
                break;
            case 'Jabatan':
                console.log('Call API add Jabatan');
                break;
            case 'Status Kerja':
                console.log('Call API add Status Kerja');
                break;
            case 'Lokasi':
                console.log(`Call API add Lokasi`)
                break;
            case 'Shift':
                console.log(`Call API add Shift`)
                break;
            case 'Tim/Grup':
                console.log(`Call API add Tim/Grup`)
                break;
            case 'Hari Libur':
                console.log(`Call API add Hari Libur`)
                break;
            
        
            default:
                break;
        }
    }

    const handleEdit = (row) => {
        // console.log(row);

        switch (pageName) {
            case 'Cabang':
                // console.log(`edit data ${pageName} dengan id, ${row.id}`)
                setIsAddOrEdit('edit');
                setInitialValues({
                    id: row.id,
                    code: row.code,
                    name: row.name,
                    longitude: row.longitude,
                    latittude: row.latittude,
                    payroll_start_date: row.payroll_start_date,
                    type: row.type
                })
                setModalIsOpen(true)
                break; 
            case 'Departemen':
                
                setIsAddOrEdit('edit');
                setInitialValues({
                    id: row.id,
                    code: row.code,
                    name: row.name,
                })
                setModalIsOpen(true)
                break;
            case 'Jabatan':
                console.log('Call API add Jabatan');
                break;
            case 'Status Kerja':
                console.log('Call API add Status Kerja');
                break;
            case 'Lokasi':
                console.log(`Call API add Lokasi`)
                break;
            case 'Shift':
                console.log(`Call API add Shift`)
                break;
            case 'Tim/Grup':
                console.log(`Call API add Tim/Grup`)
                break;
            case 'Hari Libur':
                console.log(`Call API add Hari Libur`)
                break;
            
        
            default:
                break;
        }
    }
    const handleDelete = (row) => {
        setLoading(true);
        console.log(`delete data ${pageName} dengan id, ${row.id}`)
        switch (pageName) {
            case 'Cabang':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this branch!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        console.log('Call API delete Departemen');

                        return API.deleteBranch(token, row.id).then(res => {
                            swal({
                                title: 'Berhasil',
                                text: 'Cabang berhasil dihapus',
                                icon: "success",
                              });
                            // console.log('call branch Data lagi');
                            API.getBranch(token, currentPage, perPage, searchTerm).then((res) => {
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setMessage('success get data branch');
                                setLoading(false);
                            }).catch(err => {
                                // console.log(err.response.data.message);
                                setTableData(0)
                                setMessage(err.response.data.message);
                                setLoading(false);

                            })
                        }).catch(err => {
                            console.log(err);
                            setLoading(false);
                        })
                    }
                    else {
                    //   swal("Your imaginary file is safe!");
                      setLoading(false);

                    }
                  });
                break; 
            case 'Departemen':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this branch!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        console.log('Call API delete Departemen');

                        return API.deleteDivision(token, row.id).then(res => {
                            swal({
                                title: 'Berhasil',
                                text: 'Departemen berhasil dihapus',
                                icon: "success",
                              });
                            // console.log('call division Data lagi');
                            API.getDivision(token, currentPage, perPage, searchTerm).then((res) => {
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setMessage('success get data division');
                                setLoading(false);
                            }).catch(err => {
                                // console.log(err.response.data.message);
                                setTableData(0)
                                setMessage(err.response.data.message);
                                setLoading(false);

                            })
                        }).catch(err => {
                            console.log(err);
                            setLoading(false);
                        })
                    }
                    else {
                    //   swal("Your imaginary file is safe!");
                      setLoading(false);

                    }
                  });
                break;
            case 'Jabatan':
                console.log('Call API delete Jabatan');
                break;
            case 'Status Kerja':
                console.log('Call API delete Status Kerja');
                break;
            case 'Lokasi':
                console.log(`Call API delete Lokasi`)
                break;
            case 'Shift':
                console.log(`Call API delete Shift`)
                break;
            case 'Tim/Grup':
                console.log(`Call API delete Tim/Grup`)
                break;
            case 'Hari Libur':
                console.log(`Call API delete Hari Libur`)
                break;
            
        
            default:
                break;
        }
    
    }

    const branchColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
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
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
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
    const positionColumns = [
        {Header: 'No',
            Cell: (row) => {
                return <div>{row.index+1}</div>;
            }
        },
        {Header: 'Departemen', accessor: 'division'},
        {Header: 'Nama', accessor: 'name'},
        {Header: 'Tunjangan Jabatan', accessor: 'tunjangan_jabatan'},
        {Header: 'Tunjangan Makan', accessor: 'tunjangan_makan'},
        {Header: 'Tunjangan Transport', accessor: 'tunjangan_transport'},
        {Header: 'Tunjangan Pajak', accessor: 'tunjangan_pajak'},
        {Header: 'Tunjangan Telekomunikasi', accessor: 'tunjangan_telekomunikasi'},
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
        // setSearchTerm('');
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
                // console.log(`request ke : ${pageName}`)
                break;
            case 'Cabang':
                setTotalPage(0);
                setTableColumns(branchColumns);
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
                    setTableData(0)
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
                    console.log(err.response.data.message);
                    setTableData(0);
                    setMessage(err.response.data.message || 'Data tidak ditemukan');
                    setLoading(false);
                })
                break;
            case 'Jabatan':
                console.log(`request ke : ${pageName}`)
                //dapatkan divisi
                API.getDivision(token).then((res) => {
                    //apabila ada data divisi
                    setTotalPage(0);
                    setTableColumns(positionColumns);
                    setInitialValues({
                        sendTo: 'Jabatan',
                        division_id: '',
                        name: '',
                        tunjangan_jabatan: '',
                        tunjangan_makan: '',
                        tunjangan_transport: '',
                        tunjangan_pajak: '',
                        tunjangan_telekomunikasi: '',
                        insentif: '',
                        thr: '',
                    })
                    const division = res.data.data;
                    const divisionField = {
                        control: 'select',
                        options:  [
                                    { key: '-- Pilih Departemen --', value: '' },
                                    division.map(data => (
                                        {
                                            key: data.name, value: data.id
                                        }

                                    ))
                                    
                                    
                                ],
                        label: 'Departemen',
                        name: 'type'
                    };

                    positionFields.unshift(divisionField)
                    setFormFields(positionFields)
                    setSchemaValidation(positionValidationSchema)
                    API.getDivision(token, currentPage, perPage, searchTerm).then((res) => {
                        setTableData(res.data.data)
                        setTotalPage(res.data.last_page);
                        setTotalTableData(res.data.total);
                        setPosition((currentPage - 1) * perPage)
                        setMessage('success get data position');
                        setLoading(false);
                    }).catch(err => {
                        // console.log(err.response.data.message);
                        setMessage(err.response.data.message);
                        
                        setLoading(false);
                    })
                }).catch(err => {
                    //apabila tidak ada divisi
                    console.log(err.response.data.message);
                    setMessage(err.response.data.message || 'Data tidak ditemukan');
                })
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
    }, [pageName, location, currentPage, perPage, debouncedSearchTerm, position]);
    
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
            </>
            : //else, tampilkan datatable, cek dulu apakah ada datanya
            
                <>
                <Row>
                    <Col>
                    <div className="table-control">
                        <div className="limit">
                            <span>Show :</span>
                            <select onChange={changePerPage} value={perPage}>
                            {perPageList.map(perPage => {
                                return (
                                <option key={perPage.value} value={perPage.value}>
                                {perPage.label}
                                </option>
                                )
                                })
                            }
                            </select>
                            <span>Entries</span>

                        </div>
                    

                    <div className="search">
                        <input type="text"
                            placeholder="Search here..."
                            value={searchTerm || ''}
                            onChange={e => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <button onClick={handleAdd} className="add-button">
                            <Icon icon={iconAdd} color="#fff" />
                            Add New

                    </button>
                    </div>
                 
                    {tableData ? 
                        <Table type="dataTable" tableData={tableData} tableColumns={tableColumns} />
                        : <h2 align="center">{pageName} dengan nama {searchTerm} tidak ditemukan</h2>
                    }
        
                    
                    </Col>
                </Row>
                {/* //jika tidak ada table data sembunyikan */}
                {tableData && 
                    <div className="pagination">
                        <div className="pagination-info">
                            <span>Showing {position + 1} to {( currentPage != totalPage ) ? position + 1 * perPage : totalTableData } of {totalTableData} entries</span> <br />
                        </div>
                        <div className="pagination-control">
                            <button onClick={() => prevButton()} disabled={currentPage <= 1}>&laquo;</button>
                            {renderPageNumbers}
                            <button onClick={() => nextButton()} disabled={currentPage >= totalPage}>&raquo;</button>

                        </div>
                    </div>
                }
                </>
            }
            

            
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
                    <h2 className="modal-title">{(isAddOrEdit == 'add') ? 'Tambah' : 'Edit' } {pageName}</h2>
                    <button className="close-modal" onClick={() => setModalIsOpen(false)}>X</button>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={schemaValidation} onSubmit={handleSubmit} >
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

const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
    isLoading: state.isLoading

})
  
  
const reduxDispatch = (dispatch) => ({
    loading : (data) => dispatch(setLoading(data)),
    createBranch : (token, data) => dispatch(createBranch(token, data)),
    editBranch : (token, data) => dispatch(editBranch(token, data)),

    

})
export default connect(reduxState, reduxDispatch)(HRSettingMenu)