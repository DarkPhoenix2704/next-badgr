import * as Yup from 'yup';

export const SignUpSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password length should be atleast 6').min(6),
    confirmPassword: Yup.string()
        .required('Enter Password again to confirm')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    accept: Yup.boolean().oneOf([true], 'Please Accept Terms & Conditions'),
});

export const ProfileSchema = Yup.object({
    name: Yup.string().required('Enter your FullName'),
    email: Yup.string().email().required('Enter a valid Email'),
    id: Yup.string().required('Enter a valid ID'),
});
