import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useDebounce} from '../../../utils/helpers/useDebounce';
import { Link, useHistory } from 'react-router-dom';
import { iconAdd } from '../../../assets';
import API from '../../../config/api';
import { Button, Col, Gap, Loading, Row, Table } from '../../atoms';
import MasterHeader from '../Header/Master';
import { Icon } from '../ProfileMenu/profile-menu.elements';
import { userDelete } from '../../../config/api';

/**
 * 1. Dapatkan data masing-masing master data
 * 2. Definisikan column-column masing-masing master data
 * 3. 
 */



const TableMaster = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalTableData, setTotalTableData] = useState(0);
    const [position, setPosition] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')
    const perPageList = [
        {label: "5", value: 5},
        {label: "10", value: 10},
        {label: "25", value: 25},
        {label: "50", value: 50},
    ];
    const [perPage, setPerPage] = useState(5);
    const pageName = props.location.pathname.split('/')[2];
    const title = `Master ${pageName.split('-').join(' ')}`;
    const tableName = pageName.split('-').join('_') + 's';
    const table = [
        { name: 'User', href: '/master/user'},
        { name: 'User Role', href: '/master/user-role'}
    ];
    const [tableData, setTableData] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const history = useHistory();
    const handleEdit = (row) => {
        // console.log(`edit data dengan id, ${row.id}`)
    
        const goTo = `${pageName}/edit/${row.id}`;
        // console.log(goTo);
        history.push(goTo, {
            row : row
        })
    }
    const handleDelete = (row) => {
        console.log(`delete data dengan id, ${row.id}`)
        setLoading(true);
        // const goTo = `${props}/delete/${row.id}`;
        switch (pageName) {
            case 'user':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this user!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        return userDelete(token, row.id).then(res => {
                            swal({
                                title: res.status,
                                text: res.message,
                                icon: "success",
                              });

                            API.userData(token, currentPage, perPage, searchTerm).then((res) => {
                                console.log(res)
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setLoading(false);
                            }).catch(err => {
                                console.log(err)
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
            default:
                break;
        }
        
        // console.log(goTo);
        // history.push(goTo, {
        //     row : row
        // })
        
    
    }

    const tableUsersColumns = [
        {Header: 'Id Client', accessor: 'client_id'},
        {Header: 'Nama', accessor: 'name'},
        {Header: 'Email', accessor: 'email'},
        {Header: 'Jabatan', accessor: 'role'},
        {Header: 'Nomor HP', accessor: 'phone_number'},
        {Header: 'Foto', accessor: 'photo'},
        {Header: 'Status', accessor: 'status'},
        {Header: 'Tanggal Dibuat', accessor: 'created_at'},
        {Header: 'Tanggal Diedit', accessor: 'updated_at'},
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
        
    ];
    const tableUserRolesColumns = [
        {Header: 'Id', accessor: 'id'},
        {Header: 'First Name', accessor: 'first_name'},
        {Header: 'Last Name', accessor: 'last_name'},
        {Header: 'Email', accessor: 'email'},
        {Header: 'Foto', accessor: 'avatar'},
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
        
    ];
    

    const token = localStorage.getItem('token');

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
    const getData = async (page = 1, per_page = 10) => {
        // setCurrentPage(1);
        const result = await axios(
            `https://reqres.in/api/users?page=${page}&per_page=${per_page}`,
          )
          if(result.status == 200){
              setTableData(result.data.data);
              setTotalPage(result.data.total_pages);
              
            //   console.log(result.data)
          }
    };

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
    
    useEffect(() => {
        setLoading(true);
        setCurrentPage(currentPage);
        // setTableColumns(COLUMNS);
        if (debouncedSearchTerm) {
            // setCurrentPage(1);    
            // console.log(searchTerm);
          } else {
            // console.log('ketik di pencarian');
          }
        switch (tableName) {
            case 'users':
                setTotalPage(0);
                setTableColumns(tableUsersColumns);
                API.userData(token, currentPage, perPage, searchTerm).then((res) => {
                    setTableData(res.data.data)
                    setTotalPage(res.data.last_page);
                    setTotalTableData(res.data.total);
                    setPosition((currentPage - 1) * perPage)
                    setMessage('success get data users');
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                    setMessage(err.reason);
                })
                break;
            case 'user_roles':
                setTableColumns(tableUserRolesColumns);
                getData(currentPage, perPage);
                setLoading(false);

            default:
                break;
        }

            
    }, [tableName, currentPage, perPage, debouncedSearchTerm]);
    return (
        <>
            <MasterHeader title={title} table={table} buttonName="Back" buttonTo="/master" />
            {loading ? <Loading /> : 
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
                 <Link to={`/master/${pageName}/add`} className="add-button">
                        <Icon icon={iconAdd} color="#fff" />
                        Add New

                </Link>
                </div>
                    <Table type="dataTable" tableData={tableData} tableColumns={tableColumns} />

                
                </Col>
            </Row>
            }
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
        </>
    )
}

export default TableMaster
