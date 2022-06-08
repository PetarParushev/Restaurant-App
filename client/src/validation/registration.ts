import * as yup from 'yup';
export const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^(?=[\w]).+[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/,
        'Provided email is invalid'
      ),
    password: yup
      .string()
      .required('You must specify a password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain minimum eight characters, at least one letter, one number and one special character:'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });