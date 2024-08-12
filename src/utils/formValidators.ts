import * as Yup from 'yup';

export const userLoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format, please enter a valid email address')
    .required('Email is required'),
  password: Yup.string().required(
    'Invalid password format, please follow the password requirements',
  ),
});
