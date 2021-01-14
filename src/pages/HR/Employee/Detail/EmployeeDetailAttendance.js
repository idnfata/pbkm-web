import React from 'react'

const EmployeeDetailAttendance = (props) => {
    return (
        <div className="employee-detail-main">
            informasi kehadiran karyawan id {props.employee.id}

            <div className="data-info-cuti">
                data sisa & riwayat cuti karyawan
            </div>
            <div className="data-info-izin">
                data riwayat & sisa izin
            </div>
            <div className="data-info-lembur">
                data riwayat lembur
            </div>
            <div className="data-schedules">
                data jadwal karyawan
            </div>
        </div>
    )
}

export default EmployeeDetailAttendance
