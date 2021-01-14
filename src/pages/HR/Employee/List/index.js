import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { iconAdd, iconLeft, iconUser } from '../../../../assets';
import { Gap, PageHeader, PageContent, Row, Col, Icon, Table, Button, FormControl } from '../../../../components'
import API from '../../../../config/api';
import { Formik, Form, getIn } from 'formik'
import Modal from 'react-modal';
import swal from 'sweetalert';
import { useDebounce } from '../../../../utils/helpers/useDebounce';
import { employeeListFields, employeListValidationSchema } from './fields';


Modal.setAppElement('#root');
// const token = localStorage.getItem('token');

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


const EmployeeList = (props) => {
    console.log(props);
    const token = props.user.token;
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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isAddOrEdit, setIsAddOrEdit] = useState('');
    const [divisionID, setDivisionID] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [formFields, setFormFields] = useState([]);
    const [initialValues, setInitialValues] = useState({});


    const debouncedSearchTerm = useDebounce(searchTerm, 800);


  
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

    const handleAdd = () => {
        setIsAddOrEdit('add');
        setInitialValues({
            id: '',
            nik: '',
            name: '',
            email: '',
            division_id: '',
            position_id: '',
            group_id: '',
            employment_status: '',
            start_work: '',
            need_attendance: '',
            track_location: '',
            
        })
        setModalIsOpen(true);
    }
    
    const handleEdit = (row) => {
        // console.log(row)
        setIsAddOrEdit('edit');
        setInitialValues({
            id: row.id,
            nik: row.nik,
            name: row.name,
            email: row.email,
            division_id: row.division_id,
            position_id: row.position_id,
            group_id: row.group_id,
            employment_status: row.employment_status,
            start_work: row.start_work,
            need_attendance: String(row.need_attendance),
            track_location: String(row.track_location),
        })
        setModalIsOpen(true)
    }
    const handleSubmit = async data => {
        // console.log(data)
        if(isAddOrEdit == 'add') {
            API.addEmployee(token, data).then(res => {
                // console.log(res.data.message);
                swal({
                    title: res.data.status,
                    text: res.data.message,
                    icon: "success",
                });
                setModalIsOpen(false);
                
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
            // console.log(data);
            API.editEmployee(token, data).then(res => {
                // console.log(res);
                swal({
                    title: res.data.status,
                    text: res.data.message,
                    icon: "success",
                });
                setModalIsOpen(false);
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
    }
    const handleDelete = (row) => {
        // console.log(row)
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this employee!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                // console.log('Call API delete Departemen');
                return API.deleteEmployee(token, row.id).then(res => {
                    swal({
                        title: 'Berhasil',
                        text: 'Karyawan berhasil dihapus',
                        icon: "success",
                      });
                    // console.log('call branch Data lagi');
                    //apa supaya tertriger use effectnya
                    API.getEmployee(token, currentPage, perPage, searchTerm).then((res) => {
                        setTableData(res.data.data)
                        setTotalPage(res.data.last_page);
                        setTotalTableData(res.data.total);
                        setPosition((currentPage - 1) * perPage)
                        setMessage('success get data employee');
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
    }
    const handleDetail = (row) => {
        // console.log(row)
        // console.log(props);
        // const history = props.history;
        // console.log('ke halaman detail')
        //arahkan ke halaman detail
        props.history.push('/employee/detail', {
            employee : row,
        })
    }

    const employeeListColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                console.log(row);
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        {Header: 'NIK', accessor: 'nik'},
        {Header: 'Nama', accessor: 'name'},
        {Header: 'Email', accessor: 'email'},
        {Header: 'Departemen', accessor: 'division_name'},
        {Header: 'Jabatan', accessor: 'position_name'},
        {Header: 'Tim/Grup Kerja', accessor: 'group_name'},
        {Header: 'Status', accessor: 'employment_status'},
        {Header: 'Mulai Bekerja', accessor: 'start_work'},
        {Header: 'Perlu Absensi', accessor: 'need_attendance',
            Cell: (row) => {
                const perluAbsensi = row.cell.row.original.need_attendance;
                return <div>{perluAbsensi ? 'Ya' : 'Tidak'}</div>;
                // return <div>{row.cell.row.index+1}.</div>;
            }
        },
        {Header: 'Lokasi', accessor: 'track_location',
            Cell: (row) => {
                const lacakLokasi = row.cell.row.original.track_location;
                return <div>{lacakLokasi ? 'Ya' : 'Tidak'}</div>;
                // return <div>{row.cell.row.index+1}.</div>;
            }
        },
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="detail-button" onClick={() => {handleDetail(row.row.original)}}>Detail</button> 
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];
    useEffect(() => {
        setCurrentPage(currentPage);
        setTotalPage(0);

        API.getDivision(token, 1, 1000).then((res) => {
            //apabila ada data divisi
            // console.log('departemen ditemukan');
            const dataDepartemen = res.data.data;
            // console.log(dataDepartemen);
            employeeListFields[3].options.length = 1;
            for(let i = 0; i < dataDepartemen.length; i++) {
                
                const departemen = {
                    key: dataDepartemen[i].name, value: dataDepartemen[i].id
                }
                employeeListFields[3].options.push(departemen);
                
            }
            employeeListFields[3].callback = '';
            employeeListFields[3].callback = (selectedDivision) => {
                console.log(`id departemen : ${selectedDivision}`);
                setDivisionID(selectedDivision);
            }
            // employeeListFields[5].options.length = 1;

            API.getTeamGroupByDivisionID(token, divisionID).then(res => {
                // console.log(res);
                //apabila ada data tim/grup dengan divisi yang dipilih
                employeeListFields[5].options.length = 0;
                employeeListFields[5].options.push({key: '-- Pilih Tim/Grup --', value: ''});


                const dataTimGrup = res.data;
                // console.log(dataTimGrup);
                for(let i = 0; i < dataTimGrup.length; i++) {
                    
                    const inputanTimGrup = {
                        key: dataTimGrup[i].name, value: dataTimGrup[i].id
                    }
                    employeeListFields[5].options.push(inputanTimGrup);
                    
                }
            }).catch(err => {
                employeeListFields[5].options.length = 0;

                const inputanTimGrup = {
                    key: 'Tidak ada tim/grup di departemen yang dipilih', value: ''
                }
                employeeListFields[5].options.push(inputanTimGrup);
            })
            //dapatkan jabatan
            API.getPosition(token, 1, 1000).then((res) => {
                // console.log(res);
                //apabila ada data jabatan
                const data = res.data.data;
                // console.log('jabatan ditemukan');
                setTotalPage(0);
                            //hapus dulu semua pilihan inputan departemen, kecuali yang -- pilih departemen --
                employeeListFields[4].options.length = 1;
                
                // console.log(employeeListFields[0].options);
                //masukkan data jabatan ke pilihan inputannya
                for(let i = 0; i < data.length; i++) {
                
                    const dataJabatan = {
                        key: data[i].name, value: data[i].id
                    }
                    employeeListFields[4].options.push(dataJabatan);
                    
                }
            }).catch(err => {
                setTableData(0);

                // console.log(err);
                //apabila tidak ada divisi
                // console.log(err.response.data.message);
                setMessage(err.response.data.message || 'Tambahkan jabatan terlebih dahulu');
            })
            // console.log(employeeListFields);
            setFormFields(employeeListFields)
        

            API.getEmployee(token, currentPage, perPage, searchTerm).then((res) => {
                // console.log(res.data.data);
                setTableData(res.data.data)
                setTotalPage(res.data.last_page);
                setTotalTableData(res.data.total);
                setPosition((currentPage - 1) * perPage)
                setMessage('success get data employee');
                setLoading(false);
            }).catch(err => {
                // console.log(err.response.data.message);
                // console.log(err);
                setTableData(0);
                setMessage(err.response.data.message || 'Karyawan tidak ditemukan');
                
                setLoading(false);
            })
        }).catch(err => {
            setTableData(0);
            // apabila tidak ada divisi
            // console.log(err);
            // console.log(err.response.data.message);
            setMessage(err.response.data.message || 'Tambahkan departemen terlebih dahulu');
        })



    }, [debouncedSearchTerm, modalIsOpen, divisionID, employeeListFields])
    return (
        <>
            <PageHeader
                title="Daftar Karyawan"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                <Link to='/employee' className="back-button" >                    
                    <Icon icon={iconLeft} color="#fff" />
                    <p>Back</p>
                </Link>
                {/* <button onClick={handleAdd} className="back-button">
                            Back

                </button> */}
                </Col>
            </Row>
            

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
                        <Table type="dataTable" tableData={tableData} tableColumns={employeeListColumns} />
                        : <><Gap height={30} /><h2 align="center">{message}</h2></>
                    }
                    
                    </Col>
                </Row>
                {/* //jika tidak ada table data sembunyikan */}
    
                {tableData ? 
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
                        : null
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
                    <h2 className="modal-title">{(isAddOrEdit == 'add') ? 'Tambah' : 'Edit' } Karyawan</h2>
                    <button className="close-modal" onClick={() => setModalIsOpen(false)}>X</button>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={employeListValidationSchema} onSubmit={handleSubmit} >
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
                                        callback={field.callback}
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

    

})
export default connect(reduxState, reduxDispatch)(EmployeeList)