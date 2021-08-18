import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is Required")
    .min(8, "Username must be at least 8 characters long"),
  terms: yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
});

export default formSchema;
