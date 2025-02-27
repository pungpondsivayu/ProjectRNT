import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const RegisterReq = Yup.object().shape({
  name: Yup.string().required("name is require."),
  email: Yup.string().email("Invalid email").required("email is require."),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("phoneNumber is require."),
  password: Yup.string().required("password is require."),
  role: Yup.string().required("role is require."),
});

export const LoginReq = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email is require."),
  password: Yup.string().required("password is require."),
});