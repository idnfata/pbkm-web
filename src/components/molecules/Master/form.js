import * as Yup from 'yup'

export const usersInitVal = {
  name: '',
  role: '',
  email: '',
  password: '',
  phone_number: '',
  photo: ''
}

export const usersValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required').email('Invalid email'),
  role: Yup.string().required('Required'),
  phone_number: Yup.string().required('Required'),
  // photo: Yup.string().required('Required')

})


export const fieldsUser = [
  // {Label: 'Id Client', name: 'client_id'},
  {   control: 'input',
      type: 'text',
      label: 'Nama',
      name: 'name'
  },
  {   control: 'select',
      options:  [
                  { key: 'Select an option', value: '' },
                  { key: 'Admin', value: '0' },
                  { key: 'HR', value: '1' },
                  { key: 'Asset', value: '2' },
                  { key: 'Employee', value: '3' },
              ],
      label: 'Jabatan',
      name: 'role'
  },
  {   control: 'input',
      type: 'email',
      label: 'Email',
      name: 'email'
  },
  {   control: 'input',
      type: 'password',
      label: 'Password',
      name: 'password'
  },
  {   control: 'input',
      type: 'text',
      label: 'Nomor HP',
      name: 'phone_number'
  },
  {   control: 'input',
      type: 'text',
      label: 'Foto',
      name: 'photo'
  },
  // {control: '', type: '', Label: 'Status', name: 'status'},
  // {control: '', type: '', Label: 'Tanggal Dibuat', name: 'created_at'},
  // {control: '', type: '', Label: 'Tanggal Diedit', name: 'updated_at'},
  
];
