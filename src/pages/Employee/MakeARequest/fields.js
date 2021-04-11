import * as Yup from 'yup';

export const RequestOvertimeValidationSchema = Yup.object({
    date: Yup.string().required('Tidak boleh kosong!'),
    start_from: Yup.string().required('Tidak boleh kosong!'),
    ends_on: Yup.string().required('Tidak boleh kosong!'),
    desc: Yup.string().required('Tidak boleh kosong!'),
    paid_by: Yup.string().required('Tidak boleh kosong!'),
  
  });

export const RequestLeaveValidationSchema = Yup.object({
    request_date_start: Yup.string().required('Tidak boleh kosong!'),
    request_date_end: Yup.string().required('Tidak boleh kosong!'),
    address_during_leave: Yup.string().required('Tidak boleh kosong!'),
    contact_during_leave: Yup.string().required('Tidak boleh kosong!'),

  
  });


export const RequestOvertimeFields = [
    {   
        control: 'date',
        minDate: new Date(),
        label: 'Tanggal',
        name: 'date',
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
    {   control: 'select',
        options:  [
            { key: '-- Pilih Upah Lembur --', value: '' },
            { key: 'Uang', value: 1 },
        
        ],
        label: 'Upah Lembur',
        name: 'paid_by',
    }
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