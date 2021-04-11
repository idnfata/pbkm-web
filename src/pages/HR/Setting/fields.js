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
export const holidayValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
  type: Yup.string().required('Required'),

});
export const setupOvertimeValidationSchema = Yup.object({
    is_allowed_overtime_before: Yup.string().required('Required'),
    is_allowed_overtime_after: Yup.string().required('Required'),
    overtime_limit_per_day: Yup.string().required('Required'),
    overtime_limit_per_week: Yup.string().required('Required'),
    overtime_limit_per_month: Yup.string().required('Required'),

});
export const schemaValidationSkemaLembur = Yup.object({
    paid_per: Yup.string().required('Required'),
    

});

export const positionValidationSchema = Yup.object({
  name: Yup.string().required('Tidak Boleh Kosong!'),
  gaji_pokok: Yup.number().required('Tidak Boleh Kosong!'),
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
  work_day_in_week: Yup.number().required('Required'),
  
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
export const setupLeaveValidationSchema = Yup.object({
    is_showed: Yup.string().required('Required'),
    balance: Yup.number().required('Required'),
    cannot_leave_before_days: Yup.string().required('Required'),
    request_before_day: Yup.string().required('Required'),
    max_duration_per_1_request: Yup.string().required('Required'),
    allowed_half_day: Yup.string().required('Required'),
    is_deduct_meal_allowance: Yup.string().required('Required'),
    is_deduct_transport_allowance: Yup.string().required('Required'),
    bisa_diuangkan: Yup.string().required('Required'),
  
});
export const setupLoanValidationSchema = Yup.object({
    max_loan: Yup.string().required('Required'),

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
      label: 'Gaji Pokok',
      name: 'gaji_pokok'
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

export let setupLeaveFields = [
    {   
        control: 'radio',
        options:  [
                    { key: 'Ya, Boleh', value: '1' },
                    { key: 'Tidak Boleh', value: '0' },
                    
                ],
        type: 'radio',
        label: 'Grup ini boleh mengajukan jenis cuti ini ?',
        name: 'is_showed'
    },
    {   
        control: 'input',
        type: 'number',
        label: 'Jatah dalam 1 tahun',
        name: 'balance'
    },
    {   
        control: 'input',
        type: 'number',
        label: 'Tidak bisa mengambil cuti ',
        placeholder: 'Sebelum cuti terakhir lebih dari ... hari',
        name: 'cannot_leave_before_days'
    },
    {   
        control: 'input',
        type: 'number',
        label: 'Pengajuan dilakukan sebelum',
        placeholder: '... hari',
        name: 'request_before_day'
    },
    {   
        control: 'input',
        type: 'number',
        label: 'Maksimal hari dalam 1 kali ambil cuti',
        placeholder: '... hari',
        name: 'max_duration_per_1_request'
    },
    {   
        control: 'radio',
        options:  [
                    { key: 'Bisa setengah hari', value: '1' },
                    { key: 'Harus 1 hari', value: '0' },
                    
                ],
        type: 'radio',
        label: 'Bisa diambil setengah hari ?',
        name: 'allowed_half_day'
    },
    {   
        control: 'radio',
        options:  [
                    { key: 'Ya', value: '1' },
                    { key: 'Tidak Mempengaruhi', value: '0' },
                    
                ],
        type: 'radio',
        label: 'Mempengaruhi tunjangan makan ?',
        name: 'is_deduct_meal_allowance'
    },
    {   
        control: 'radio',
        options:  [
                    { key: 'Mempengaruhi', value: '1' },
                    { key: 'Tidak', value: '0' },
                    
                ],
        type: 'radio',
        label: 'Mempengaruhi tunjangan transport ?',
        name: 'is_deduct_transport_allowance'
    },

    {   
        control: 'radio',
        options:  [
                    { key: 'Bisa', value: '1' },
                    { key: 'Tidak Bisa', value: '0' },
                    
                ],
        type: 'radio',
        label: 'Bisa diuangkan ?',
        name: 'bisa_diuangkan'
    },
    {   
        control: 'format-number',
        type: 'number',
        label: 'Rupiah 1x cutinya',
        name: 'rp_per_1_x_cuti'
    },
];

export const setupLoanFields = [
    {   
        control: 'format-number',
        type: 'number',
        label: 'Max. Pinjaman',
        name: 'max_loan'
    }
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
    {   control: 'input',
        type: 'number',
        label: 'Hari Kerja / Minggu',
        name: 'work_day_in_week'
    },
];

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
  {   control: 'input',
      label: 'Tanggal',
      name: 'date',
      type: 'date'
  },
  {   control: 'select',
        options:  [
                    { key: '-- Pilih --', value: '' },
                    { key: 'Hari Libur Nasional', value: 'Hari Libur Nasional' },
                    { key: 'Hari Libur Keagamaan', value: 'Hari Libur Keagamaan' },
                    { key: 'Cuti Bersama', value: 'Cuti Bersama' },
                    
                ],
        label: 'Jenis Hari Libur',
        name: 'type',
        // callback: 
    },
];


export const setupOvertimeFields = [
    {   control: 'select',
        options:  [
                    { key: '-- Pilih --', value: '' },
                    { key: 'Boleh', value: '1' },
                    { key: 'Tidak', value: '0' },
                    
                ],
        label: 'Lembur Sebelum Jam Kerja',
        name: 'is_allowed_overtime_before',
        // callback: 
    },
    {   control: 'select',
        options:  [
                    { key: '-- Pilih --', value: '' },
                    { key: 'Boleh', value: '1' },
                    { key: 'Tidak', value: '0' },
                    
                ],
        label: 'Lembur Setelah Jam Kerja',
        name: 'is_allowed_overtime_after'
        // callback: 
    },

    {  
        control: 'input',
        type: 'text',
        label: 'Batas Lembur Per Hari(Dalam Jam)',
        name: 'overtime_limit_per_day'
    },
    {  
        control: 'input',
        type: 'text',
        label: 'Batas Lembur Per Minggu(Dalam Jam)',
        name: 'overtime_limit_per_week'
    },
    {  
        control: 'input',
        type: 'text',
        label: 'Batas Lembur Per Bulan(Dalam Jam)',
        name: 'overtime_limit_per_month'
    },
];


export const setupOvertimeSchemeFields = [
    {   control: 'select',
        options:  [
                    { key: '-- Pilih Skema Perhitungan Upah Lembur --', value: '' },
                    { key: 'Sesuai Peraturan 102 MEN VI 2004 Pasal 1', value: '1' },
                    { key: 'Per Sekali Lembur', value: '2' },
                    { key: 'Dihitung Dari Total Jam * Nominal yang ditentukan', value: '3' },
                    
                ],
        label: 'Skema Upah Apabila Lembur di Jenis Hari ini',
        name: 'paid_per',
        // callback: 
    },
   
   
    
];

export const payrollComponentFields = [
    {   
        control: 'input',
        type: 'text',
        label: 'Nama Hari Libur',
        name: 'name'
    },
    {   
        control: 'radio',
        options:  [
                    
                    { key: 'Penambah', value: '1' },
                    { key: 'Pengurang', value: '2' },
                    
                    
                ],
        label: 'Jenis Komponen',
        name: 'category',
        // callback: 
    },
];
