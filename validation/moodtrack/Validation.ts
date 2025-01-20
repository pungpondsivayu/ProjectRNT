import * as Yup from 'yup';


export const Validation = Yup.object().shape({
    feeling: Yup.string().required("feeling is require."),
  });