import * as yup from "yup";
//mold/template/rubric for what yup should expect in the inputs. Yup will compare actual inserts to these rules
const formSchema = yup.object().shape({
  first_name: yup.string().trim().required("Enter first name"),
  last_name: yup.string().trim().required("Enter last name"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is Required")
    .min(6, "Must be at least 6 characters long"), //each rule is specific to that rule.  will have to research yup docs to find other rules for other required
  terms: yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
});

export default formSchema;
