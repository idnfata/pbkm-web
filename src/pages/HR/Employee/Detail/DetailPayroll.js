import React from 'react'

const DetailPayroll = (props) => {
    return (
        <>
            <div className="employee-detail-main">
            informasi detail payroll karyawan id {props.employee.id}
                <div className="gaji-pokok">
                        data gapok karyawan
                </div>
                <div className="bank-account">
                    data bank account
                </div>
                <div className="variabel-penambah">
                    data variabel penambah gaji(tunjangan, dll)
                </div>
                <div className="variabel-pengurang">
                    data variabel pengurang gaji(pinjaman, keterlambatan, tidak hadir, dll)
                </div>
                <div className="bpjs-kes-tk">
                    data bpjs kes & tk yang ditanggung karyawan(diri sendiri & keluarga)
                </div>
                <div className="pph21">
                    data pph21 yang ditanggung karyawan(diri sendiri & keluarga)
                </div>
                <div className="payroll-component">
                    component payroll(variabel penambah, variabel pengurang, gapok)
                </div>
                
                
            </div>
        </>
    )
}

export default DetailPayroll
