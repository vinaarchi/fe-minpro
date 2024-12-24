import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 character")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(
      ["CUSTOMER", "ORGANIZER"],
      "Role must be either customer or organizer"
    )
    .required("Role is required"),
  referralCode: Yup.string(),
});
