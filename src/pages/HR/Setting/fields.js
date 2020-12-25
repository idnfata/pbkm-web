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
  longitude: Yup.string().required('Required'),
  latittude: Yup.string().required('Required'),
  payroll_start_date: Yup.string().required('Required'),
  type: Yup.string().required('Required')

});

export const divisionValidationSchema = Yup.object({
  code: Yup.string().required('Required'),
  name: Yup.string().required('Required'),

});

export const positionValidationSchema = Yup.object({

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
