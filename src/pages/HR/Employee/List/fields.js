import * as Yup from 'yup';

export const employeListValidationSchema = Yup.object({
    //   division_id: Yup.string().required('Required'),
        group_id: Yup.number().required('Required'),
        name: Yup.string().required('Required'),
     
      
});

// id: '',
// nik: '',
// name: '',
// email: '',
// position_id: '',
// group_id: '',
// employeement_status: '',
// start_work: '',
// need_attendance: '',
// track_location: '',
export let employeeListFields = [
    {   control: 'input',
        type: 'number',
        label: 'No. Induk Karyawan',
        name: 'nik'
    },
    {   control: 'input',
        type: 'text',
        label: 'Nama Karyawan',
        name: 'name'
    },
    {   control: 'input',
        type: 'text',
        label: 'Email',
        name: 'email'
    },
    
   //field jabatan ditambahkan setelah mendapat data jabatan
    //apakah shiftnya jam masuk, istirahat, dan pulangnya fix setiap harinya? jika fix, tampilkan ini, jika dinamis, tampilkan inputan lain
      //field jabatan ditambahkan setelah mendapat data jabatan
    {   control: 'select',
        options:  [
            { key: '-- Pilih Departemen --', value: '' },

        ],
        label: 'Departemen',
        name: 'division_id',
        
    },
    {   control: 'select',
        options:  [
            { key: '-- Pilih Jabatan --', value: '' },

        ],
        label: 'Jabatan',
        name: 'position_id'
    },
    {   control: 'select',
        options:  [
            { key: '-- Pilih Tim/Grup --', value: '' },

        ],
        label: 'Tergabung di Tim/Grup',
        name: 'group_id'
    },
    {   control: 'select',
        options:  [
            { key: '-- Pilih Status Karyawan --', value: '' },
            { key: 'Kontrak', value: 'Kontrak' },
            { key: 'Tetap', value: 'Tetap' },
            { key: 'Magang', value: 'Magang' },
            { key: 'Percobaan', value: 'Percobaan' },
            { key: 'Tenaga Ahli', value: 'Tenaga Ahli' },

        ],
        label: 'Status Kerja Karyawan',
        name: 'employeement_status'
    },
    {   control: 'input',
        type: 'date',
        label: 'Mulai Bekerja',
        name: 'start_work'
    },
    {
        control: 'radio',
        options:  [
            { key: 'Tidak Perlu', value: '0' },
            { key: 'Ya, Perlu', value: '1' },
            
        ],
        type: 'radio',

        label: 'Perlu Melakukan Absensi? ',
        name: 'need_attendance'
    },
    {
        control: 'radio',
        options:  [
            { key: 'Tidak', value: '0' },
            { key: 'Ya, Lacak', value: '1' },
            
        ],
        type: 'radio',
        label: 'Lacak Lokasi ?',
        name: 'track_location'
    },
    
    
  ];