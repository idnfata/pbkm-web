import * as Yup from 'yup';

export const RequestOvertimeValidationSchema = Yup.object({
    date: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    start_from: Yup.string().required('Required'),
    ends_on: Yup.string().required('Required'),
    desc: Yup.string().required('Required'),
  
  });

export const RequestLeaveValidationSchema = Yup.object({
    request_date_start: Yup.string().required('Tidak boleh kosong!'),
    request_date_end: Yup.string().required('Tidak boleh kosong!'),
    address_during_leave: Yup.string().required('Tidak boleh kosong!'),
    contact_during_leave: Yup.string().required('Tidak boleh kosong!'),

  
  });


export const RequestOvertimeFields = [
    {   
        control: 'input',
        type: 'date',
        label: 'Tanggal',
        name: 'date',
    },
    {   
        control: 'select',
        label: 'Jenis Lembur',
        name: 'type',
        options: [
            { key: '-- Pilih Jenis Lembur --', value: '' },
            {key: 'Sebelum Masuk', value: '1'},
            {key: 'Sesudah Pulang', value: '2'},
        ]
    },
    {
        control: 'time',
        label: 'Jam Mulai',
        name: 'start_from'
    },
    {
        control: 'time',
        label: 'Jam Selesai',
        name: 'ends_on'
    },
    {   control: 'textarea',
        label: 'Alasan Lembur',
        name: 'desc',
    },
];  

export const RequestLeaveFields = [
    {   
        control: 'date',
        // type: 'date',
        label: 'Dari Tanggal',
        name: 'request_date_start',
    },
    {   
        control: 'date',
        // type: 'date',
        label: 'Sampai Tanggal',
        name: 'request_date_end',
    },
];