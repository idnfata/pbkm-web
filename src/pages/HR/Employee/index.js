import React from 'react'
import { connect } from 'react-redux'
import { iconUser } from '../../../assets'
import { PageHeader } from '../../../components'
import { MenuBuatPengumuman, MenuCuti, MenuIzin, MenuJadwal, MenuKehadiran, MenuLembur, MenuListKaryawan, PageContent, MenuPenggantianBiaya, MenuPeringatan, MenuPinjaman, MenuTugas, MenuBPJS, MenuPPh21, MenuPayroll } from './page-employee-hr.elements'

const Employee = (props) => {
    console.log(props)
    return (
        <>
        <PageHeader
            title="Karyawan"
            subtitle={props.user.client_id}
            name={props.user.name}
            photo={iconUser}
        />
        
        <PageContent>
            <MenuListKaryawan className="page-content-menu" to="/employee/list">
            Daftar Karyawan
            </MenuListKaryawan>
            <MenuJadwal className="page-content-menu" to="/employee/schedule">
                Jadwal
            </MenuJadwal>
            <MenuKehadiran className="page-content-menu" to="/employee/attendance">
                Kehadiran
            </MenuKehadiran>
            <MenuTugas  className="page-content-menu" to="/employee/task">Tugas</MenuTugas>
            <MenuPayroll className="page-content-menu" to="/employee/payroll">Payroll</MenuPayroll>
            <MenuBPJS className="page-content-menu" to="/emloyee/bpjs">BPJS</MenuBPJS>
            <MenuPPh21 className="page-content-menu" to="/employee/pph21">PPh 21</MenuPPh21>
            <MenuLembur className="page-content-menu" to="/employee/overtime">
                Lembur
            </MenuLembur>
            <MenuIzin className="page-content-menu" to="/employee/permit">Izin</MenuIzin>
            <MenuCuti className="page-content-menu" to="/employee/leave">Cuti</MenuCuti>
            <MenuPinjaman className="page-content-menu" to="/employee/loan">Pinjaman</MenuPinjaman>
            <MenuPenggantianBiaya className="page-content-menu" to="/employee/reimbursement">Penggantian Biaya</MenuPenggantianBiaya>
            <MenuBuatPengumuman className="page-content-menu" to="/create-announcement">Buat Pengumuman</MenuBuatPengumuman>
            <MenuPeringatan className="page-content-menu" to="/employee/warning-letter">Surat Peringatan</MenuPeringatan>
        </PageContent>
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
export default connect(reduxState, reduxDispatch)(Employee)