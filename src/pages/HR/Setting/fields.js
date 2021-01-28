import * as Yup from 'yup'





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
  name: Yup.string().required('Required'),
  tunjangan_jabatan: Yup.number(),
  // tunjangan_makan: Yup.string().required('Required'),
  // tunjangan_transport: Yup.string().required('Required'),
  // tunjangan_pajak: Yup.string().required('Required'),
  // tunjangan_telekomunikasi: Yup.string().required('Required'),
  // insentif: Yup.string().required('Required'),
  // thr: Yup.string().required('Required'),
});
export const teamGroupValidationSchema = Yup.object({
//   division_id: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  approver_1: Yup.number().required('Required'),
  
});

export const workLocationValidationSchema = Yup.object({
    name: Yup.string().required('Required'),
    longitude: Yup.string().required('Required'),
    latittude: Yup.string().required('Required'),
    radius_attendance: Yup.number().required('Required'),
  
});

export const workShiftValidationSchema = Yup.object({
    division_id: Yup.string().required('Required'),
    group_id: Yup.number().required('Required'),
    name: Yup.string().required('Required'),
 
  
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
//   {control: 'select',
//         options:  [
//                     { key: '-- Pilih Departemen --', value: '' },
                    
//                 ],
//         label: 'Departemen',
//         name: 'division_id'
//     },
  {   control: 'input',
      type: 'text',
      label: 'Nama Jabatan',
      name: 'name'
  },
  {   control: 'format-number',
      type: 'number',
      label: 'Tunjangan Jabatan',
      name: 'tunjangan_jabatan'
  },
  {   control: 'format-number',
      type: 'number',
      label: 'Tunjangan Makan',
      name: 'tunjangan_makan'
  },
  {   control: 'format-number',
      type: 'number',
      label: 'Tunjangan Transport',
      name: 'tunjangan_transport'
  },
  {   control: 'format-number',
      type: 'number',
      label: 'Tunjangan Pajak',
      name: 'tunjangan_Pajak'
  },
  {   control: 'format-number',
      type: 'number',
      label: 'Tunjangan Telekomunikasi',
      name: 'tunjangan_telekomunikasi'
  },
  {   control: 'format-number',
      type: 'number',
      label: 'Insentif',
      name: 'insentif'
  },
  {   control: 'format-number',
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

export let teamGroupFields = [
  //field departemen ditambahkan setelah mendapat data departemen
  //field jabatan yang menyetujui request juga
    {   control: 'select',
        options:  [
                    { key: '-- Pilih Departemen --', value: '' },
                    
                ],
        label: 'Departemen',
        name: 'division_id',
        // callback: 
    },
    {   control: 'input',
        type: 'text',
        label: 'Nama Tim/Grup',
        name: 'name'
    },
    {   control: 'select',
        options:  [
                { key: '-- Pilih Jabatan --', value: '' },
                
            ],
        label: 'Yang Menyetujui Pengajuan Izin & Cuti 1',
        name: 'approver_1'
    },
    {   control: 'select',
        options:  [
                { key: '-- Pilih Jabatan --', value: '' },
                
        ],
        label: 'Yang Menyetujui Pengajuan Izin & Cuti 2',
        name: 'approver_2'
    },
    {   control: 'radio',
        options:  [
                    { key: 'Libur', value: '1' },
                    { key: 'Masuk', value: '0' },
                    
                ],
        type: 'radio',
        label: 'Minggu / Tanggal Merah Tetap Masuk ?',
        name: 'public_holiday_is_off'
    },
];

// {   control: 'input',
// type: 'number',
// label: 'Minimal Waktu Kerja (Dalam Jam per Bulan)',
// name: 'min_work_duration'
// },
// {   control: 'input',
// type: 'number',
// label: 'Toleransi Keterlambatan',
// name: 'late_tolerance'
// },
// {   control: 'input',
// type: 'number',
// label: 'Minimal Hari Kerja (Dalam Hari per Bulan)',
// name: 'min_work_day'
// },
// {   control: 'radio',
// options:  [
//             { key: 'Sabtu', value: '6' },
//             { key: 'Minggu', value: '7' },
//             { key: 'Sabtu & Minggu', value: '1' },
//             { key: 'Tidak Tentu', value: '8' },
//             { key: 'Tidak Ada Libur', value: '0' },
            
//         ],
// label: 'Hari Off Kerja',
// name: 'off_day'
// },
// {   control: 'radio',
// options:  [
//             { key: 'Libur', value: '0' },
//             { key: 'Masuk', value: '1' },
            
//         ],
// label: 'Tanggal Merah Tetap Masuk ?',
// name: 'public_holiday_is_off'
// },
// {   control: 'radio',
// options:  [
//     { key: 'Boleh', value: '1' },
//             { key: 'Tidak', value: '0' },
            
//         ],
// label: 'Boleh Pulang Lebih Awal ?',
// name: 'is_allowed_out_early'
// },
// {   control: 'radio',
// options:  [
//     { key: 'Boleh', value: '1' },
//             { key: 'Tidak', value: '0' },
            
//         ],
// label: 'Boleh Cuti ?',
// name: 'is_allowed_leave'
// },
// {   control: 'radio',
// options:  [
//     { key: 'Boleh', value: '1' },
//     { key: 'Tidak', value: '0' },
      
//   ],
// label: 'Boleh Tukar Shift ?',
// name: 'is_allowed_switch_shift'
// },

export let workLocationFields = [

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
    //field group ditambahkan setelah mendapat data group
    {   control: 'select',
    options:  [
        { key: '-- Pilih Departemen --', value: '' },

    ],
    label: 'Departemen',
    name: 'division_id',        
    },

    {   control: 'select',
    options:  [
                { key: '-- Pilih Tim/Grup --', value: '' },
                
            ],
    label: 'Berlaku Untuk Tim/Group Kerja',
    name: 'group_id'
    },
    
  {   control: 'input',
      type: 'text',
      label: 'Nama Jam Kerja/Shift',
      name: 'name'
  },
  {   control: 'date',
    label: 'Berlaku Mulai',
    type: 'date',
    name: 'effective_from_date'
    },
    {   control: 'radio',
        options:  [
                    { key: 'Ya', value: '1' },
                    { key: 'Tidak', value: '0' },
                    
                ],
        label: 'Waktu Kerja & Istirahat Sama Setiap Harinya?',
        type: 'radio',
        name: 'is_time_same_every_day',
    },
 
   
 
   
  
];

export const everydayFields = [
         
    {
        control: 'time',
        label: 'Masuk',
        name: 'monday_time_in',
    },
    {
        control: 'time',
        label: 'Pulang',
        name: 'monday_time_out',
    },
    {
        control: 'time',
        label: 'Istirahat',
        name: 'monday_time_break_start',
    },
    {
        control: 'input',
        label: 'Durasi Istirahat',
        name: 'monday_break_duration',
        type: 'number',
    },
    {
        control: 'input',
        label: 'Toleransi Telat',
        name: 'monday_late_tolerance',
        type: 'number',
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

