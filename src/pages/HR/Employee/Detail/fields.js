import * as Yup from 'yup'



export const loginDataValidationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid email'),
    password: Yup.string().required('Required').min(8),
    repeat_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords harus sama')
    
  
});

export const loginDataFields = [
    {   control: 'input',
        type: 'hidden',
        label: '',
        name: 'name',
    },
    {   control: 'input',
        type: 'text',
        label: 'Email',
        name: 'email',
        readOnly: true,
    },
    {   control: 'input',
        type: 'password',
        label: 'Password',
        name: 'password'
    },
    {   control: 'input',
        type: 'password',
        label: 'Ulang Password',
        name: 'repeat_password'
    },
    {   control: 'input',
        type: 'hidden',
        label: '',
        name: 'role'
    },
  
];