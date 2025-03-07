import * as Yup from 'yup';


export const Validation = Yup.object().shape({
    feeling: Yup.string().required("feeling is require."),
    stress_level : Yup.number().min(0).required(),
    sleep_hours : Yup.number().min(0).required(),
    exercise_minutes : Yup.number().min(0).required(),
    social_interaction_score : Yup.number().min(0).required(),
    notes: Yup.string().required("notes is require."),
  });