import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconPlus, iconUser } from '../../../assets'
import { Col, FilterYear, Gap, Icon, PageHeader, Row } from '../../../components'
import API from '../../../config/api'
import { YMdToFormatIndo, timeStrToFormatIndo } from '../../../utils/helpers/date'
import { OHTopButton, OHRequestButtonMobile, OHList, RHHover } from './request-histories.elements';

const OvertimeHistories = (props) => {
    // console.log(props)
    const token = props.user.token;
    const employee = props.user.info;
    const history = props.history;
    const [overtimes, setOvertimes] = useState([]);
    const [message, setMessage] = useState('');

    const year = (new Date()).getFullYear();
    const startYear = (new Date()).getFullYear() - 3;
    const [selectedYear, setSelectedYear] = useState(year);

    const handleChangeYearFilter = (e) => {
        setSelectedYear(e.target.value);
       
    }

    const cancelRequest = (id) => {
        // console.log('cancell request', id);

        swal({
            title: "Anda yakin?",
            text: "Pengajuan Lembur Akan Dibatalkan",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                // console.log('Call API delete Departemen');
                return API.deleteOvertimeRequest(token, id).then(res => {
                    swal({
                        title: 'Berhasil',
                        text: 'Pengajuan Lembur Berhasil Dibatalkan',
                        icon: "success",
                      });
                    // console.log('call overtime histories lagi');
                    API.getEmployeeOvertimeRequest(token, employee.id, selectedYear).then(res => {
                        console.log(res.data);
                        setOvertimes(res.data);
                    }).catch(err => {
                        console.log(err);
                        setOvertimes([]);
            
                        setMessage(err.response.data.message);
                    })
           
                }).catch(err => {
                    console.log(err);
                })
            }
          });
    }
 
    const handleClickOH = (overtime) => {
        if(overtime.status == 0){
            if(new Date(overtime.date) < new Date()){
                console.log('go to detail')
                // history.push(`/overtime/detail`, {overtime: overtime})

            }else {
                cancelRequest(overtime.id)

            }
        }else {
            console.log('go to detail', overtime.id)
            // history.push(`/overtime/detail`, {overtime: overtime})

        }
        
    }

    useEffect(() => {
        API.getEmployeeOvertimeRequest(token, employee.id, selectedYear, 'at-year').then(res => {
            console.log(res.data);
            setOvertimes(res.data);
        }).catch(err => {
            console.log(err);
            setOvertimes([]);

            setMessage(err.response.data.message);
        })
    }, [selectedYear]);


    return (
        <>
            <PageHeader
                title="Riwayat Lembur"
                mobileTitle="Riwayat Lembur"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <OHTopButton>
            
                <Link to='/request' className="back-button" >                    
                    <Icon icon={iconLeft} color="#fff" />
                    <p>Back</p>
                </Link>
                    
       
                <Link to='/request/overtime' className="add-button">
                        <Icon icon={iconAdd} color="#fff" />
                        Ajukan Lembur

                </Link>
                
                <div className="filter-year-wrapper">
                    <FilterYear year={year} startYear={startYear} selectedYear={selectedYear} handleChange={handleChangeYearFilter} />
                </div>
            </OHTopButton>
            <Gap height={20} />
        
           <OHRequestButtonMobile>
                <Link to='/request/overtime'>
                        <Icon icon={iconPlus} color="#fff" />
                </Link>
           </OHRequestButtonMobile>

           
            <OHList>
                {(overtimes.length > 0) ?
                    overtimes.map(overtime => (
                        <div className="oh-list-wrapper" key={overtime.id} onClick={() => handleClickOH(overtime)}>
                             <div className="oh-status">
                            {/* 
                                jika disetujui, accepted
                                jika tidak = 1, cek apakah tanggal lembur kurang dari hari ini?
                                jika kurang dari hari ini, cek statusnya apakah 0?
                            */}
                                    {overtime.status == 1 ? <p className="accepted">Disetujui</p> : (new Date(overtime.date) < new Date() && overtime.status == 0) ? <p className="declined">Ditolak oleh sistem</p> : overtime.status == 0 ? <p className="waiting">Menunggu Persetujuan</p> : <p className="declined">Ditolak</p> }
                               
                                

                                </div>
                            <div className="oh-list-header">
                                <div className="oh-title">
                                    {/* <h3>{overtime.overtime_day_type}</h3> */}
                                    <h3>
                                        {(() => {
                                        if (overtime.overtime_day_type == 1){
                                            return "Hari Kerja";
                                        }
                                        if(overtime.overtime_day_type == 2){
                                            return "Hari Off Kerja";
                                        }
                                        if(overtime.overtime_day_type == 3){
                                            return "Hari Libur Nasional";
                                        }
                                        if(overtime.overtime_day_type == 4){
                                            return "Hari Libur Keagamaan";
                                        }
                                        if(overtime.overtime_day_type == 5){
                                            return "Cuti Bersama";
                                        }
                                        
                                        
                                        })()}
                                    </h3>
                                    <p>{YMdToFormatIndo(overtime.date)}</p>
                                </div>
                               
                           
                            </div>
                            <RHHover className="rh-hover" status={overtime.status == 1 ? 1 : (new Date(overtime.date) < new Date() && overtime.status == 0) ? 1 : overtime.status == 0 ? 0 : 1 }>
                            

                                {/* {overtime.status == 1 ? "Detail" : (new Date(overtime.date) < new Date()) ? "Detail" : "Batalkan Pengajuan" } */}
                                {overtime.status == 1 ? "Detail" : (new Date(overtime.date) < new Date() && overtime.status == 0) ? "Detail" : overtime.status == 0 ? "Batalkan Pengajuan" : "Detail" }


                            </RHHover>
                            <div className="oh-list-body">
                                <div className="oh-duration">
                                    <div className="oh-time-total-hours">
                                        3 Jam <span>45 Menit</span>
                                    </div>
                                    <div className="oh-time-start-end">
                                        {`${overtime.start_from} - ${overtime.ends_on}`}
                                    </div>
                                    <div className="oh-desc">
                                        desc
                                    </div>
                                </div>
                            </div>

                            <div className="oh-list-footer">
                                <p className="oh-created-at">
                                    <span>Diajukan pada : </span>{timeStrToFormatIndo(overtime.created_at)}
                                </p>
                            
                            </div>
                            
                            
                        </div>
                    ))
                     :
                    <h3 className="tidak-ada-riwayat-lembur">
                        {message}
                    </h3>
                }
            </OHList>

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
export default connect(reduxState, reduxDispatch)(OvertimeHistories)
