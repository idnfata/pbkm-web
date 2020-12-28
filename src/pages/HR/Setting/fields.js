import * as Yup from 'yup'
import API from '../../../config/api';





export const companyInfoValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  email: Yup.string().required('Required').email('Invalid email'),
  telp: Yup.string().required('Required'),
  // photo: Yup.string().required('Required')

});

export const branchValidationSchema = Yup.object({
  code: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
//   longitude: Yup.string().required('Required'),
//   latittude: Yup.string().required('Required'),
  payroll_start_date: Yup.string().required('Required'),
  type: Yup.string().required('Required')

});

export const divisionValidationSchema = Yup.object({
  code: Yup.string().required('Required'),
  name: Yup.string().required('Required'),

});

export const positionValidationSchema = Yup.object({
  division_id: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  // tunjangan_jabatan: Yup.string().required('Required'),
  // tunjangan_makan: Yup.string().required('Required'),
  // tunjangan_transport: Yup.string().required('Required'),
  // tunjangan_pajak: Yup.string().required('Required'),
  // tunjangan_telekomunikasi: Yup.string().required('Required'),
  // insentif: Yup.string().required('Required'),
  // thr: Yup.string().required('Required'),
});

export const branchFields = [
  // {Label: 'Id Client', name: 'client_id'},
  {   control: 'select',
      options:  [
                  { key: 'Select an option', value: '' },
                  { key: 'Cabang Utama', value: 'Utama' },
                  { key: 'Pembantu', value: 'Pembantu' },
                  
              ],
      label: 'Jenis',
      name: 'type'
  },
  {   control: 'input',
      type: 'text',
      label: 'Nama Cabang',
      name: 'name'
  },
  {   control: 'input',
      type: 'text',
      label: 'Kode Cabang',
      name: 'code'
  },
 
  {   control: 'input',
      type: 'text',
      label: 'Latittude',
      name: 'latittude'
  },
  {   control: 'input',
      type: 'text',
      label: 'Longitude',
      name: 'longitude'
  },
  {   control: 'input',
      type: 'text',
      label: 'Tanggal Payroll',
      name: 'payroll_start_date'
  },
 
  

];

export const divisionFields = [
  {   control: 'input',
      type: 'text',
      label: 'Kode Departemen',
      name: 'code'
  },
  {   control: 'input',
      type: 'text',
      label: 'Nama Departemen',
      name: 'name'
  }

];

export let positionFields = [
  //field departemen ditambahkan setelah mendapat data departemen
  {   control: 'input',
      type: 'text',
      label: 'Nama Jabatan',
      name: 'name'
  },
  {   control: 'input',
      type: 'number',
      label: 'Tunjangan Jabatan',
      name: 'tunjangan_jabatan'
  },
  {   control: 'input',
      type: 'number',
      label: 'Tunjangan Makan',
      name: 'tunjangan_makan'
  },
  {   control: 'input',
      type: 'number',
      label: 'Tunjangan Transport',
      name: 'tunjangan_transport'
  },
  {   control: 'input',
      type: 'number',
      label: 'Tunjangan Pajak',
      name: 'tunjangan_Pajak'
  },
  {   control: 'input',
      type: 'number',
      label: 'Tunjangan Telekomunikasi',
      name: 'tunjangan_telekomunikasi'
  },
  {   control: 'input',
      type: 'number',
      label: 'Insentif',
      name: 'insentif'
  },
  {   control: 'input',
      type: 'number',
      label: 'Tunjangan Hari Raya',
      name: 'thr'
  },
];

export const employementsStatusFields = [
    {   control: 'input',
        type: 'text',
        label: 'Status Kerja',
        name: 'name'
    },
    {   control: 'input',
        type: 'number',
        label: 'Durasi',
        name: 'duration'
    },
];

export let timGroupFields = [
  //field departemen ditambahkan setelah mendapat data departemen
  //field jabatan yang menyetujui request juga
  {   control: 'input',
      type: 'text',
      label: 'Nama Tim/Grup',
      name: 'name'
  },
  {   control: 'input',
      type: 'number',
      label: 'Minimal Waktu Kerja (Dalam Jam per Bulan)',
      name: 'min_work_duration'
  },
  {   control: 'input',
      type: 'number',
      label: 'Toleransi Keterlambatan',
      name: 'late_tolerance'
  },
  {   control: 'input',
      type: 'number',
      label: 'Minimal Hari Kerja (Dalam Hari per Bulan)',
      name: 'min_work_day'
  },
  {   control: 'radio',
      options:  [
                  { key: 'Sabtu', value: '6' },
                  { key: 'Minggu', value: '7' },
                  { key: 'Sabtu & Minggu', value: '1' },
                  { key: 'Tidak Tentu', value: '8' },
                  { key: 'Tidak Ada Libur', value: '0' },
                  
              ],
      label: 'Hari Off Kerja',
      name: 'off_day'
  },
  {   control: 'radio',
      options:  [
                  { key: 'Libur', value: '0' },
                  { key: 'Masuk', value: '1' },
                  
              ],
      label: 'Tanggal Merah Tetap Masuk ?',
      name: 'public_holiday_is_off'
  },
  {   control: 'radio',
      options:  [
          { key: 'Boleh', value: '1' },
                  { key: 'Tidak', value: '0' },
                  
              ],
      label: 'Boleh Pulang Lebih Awal ?',
      name: 'is_allowed_out_early'
  },
  {   control: 'radio',
      options:  [
          { key: 'Boleh', value: '1' },
                  { key: 'Tidak', value: '0' },
                  
              ],
      label: 'Boleh Cuti ?',
      name: 'is_allowed_leave'
  },
  {   control: 'radio',
      options:  [
          { key: 'Boleh', value: '1' },
          { key: 'Tidak', value: '0' },
            
        ],
      label: 'Boleh Tukar Shift ?',
      name: 'is_allowed_switch_shift'
  },
];

export let workLocationFields = [
  //field group ditambahkan setelah mendapat data group
  {   control: 'input',
      type: 'text',
      label: 'Nama Lokasi',
      name: 'name'
  },
  {   control: 'input',
      type: 'number',
      label: 'Longitude',
      name: 'longitude'
  },
  {   control: 'input',
      type: 'number',
      label: 'Latittude',
      name: 'latittude'
  },
  {   control: 'input',
      type: 'number',
      label: 'Radius Absensi (meter)',
      name: 'radius_attendance'
  },
 
];

export let workShiftFields = [
  //field group ditambahkan setelah mendapat data group
  //apakah shiftnya jam masuk, istirahat, dan pulangnya fix setiap harinya? jika fix, tampilkan ini, jika dinamis, tampilkan inputan lain
  {   control: 'input',
      type: 'text',
      label: 'Nama Shift',
      name: 'name'
  },
  {   control: 'input',
      type: 'number',
      label: 'Jam Masuk',
      name: 'time_in'
  },
  {   control: 'input',
      type: 'number',
      label: 'Jam Keluar',
      name: 'time_out'
  },
  {   control: 'input',
      type: 'number',
      label: 'Jam Istirahat',
      name: 'time_break_start'
  },
  {   control: 'input',
      type: 'number',
      label: 'Durasi Istirahat',
      name: 'break_duration'
  },
];

export const holidayFields = [
  {   control: 'input',
      type: 'text',
      label: 'Nama Hari Libur',
      name: 'name'
  },
  {   control: 'date',
      label: 'Tanggal',
      name: 'date'
  },
  {   control: 'radio',
      options:  [
                  { key: 'Hari Libur Nasional', value: 'Hari Libur Nasional' },
                  { key: 'Cuti Bersama', value: 'Cuti Bersama' },
                  
              ],
      label: 'Jenis',
      name: 'type'
  },
  {   control: 'radio',
      options:  [
                  { key: 'Tidak', value: '0' },
                  { key: 'Ya', value: '1' },
                  
              ],
      label: 'Mengurangi Jatah Cuti ? ',
      name: 'is_deduct_leave_balance'
  },
];

