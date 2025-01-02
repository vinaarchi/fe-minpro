import * as Yup from "yup";

export const customerValidationSchema = Yup.object({
  fullname: Yup.string().required("Nama Lengkap diperlukan"),
  username: Yup.string().required("Nama Panggilan diperlukan"),
  email: Yup.string().email("Email Tidak Valid").required("Email diperlukan"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Nomor ponsel tidak valid")
    .required("Nomor ponsel diperlukan"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Pilih Jenis Kelamin")
    .required("Jenis Kelamin diperlukan"),
  imgProfile: Yup.mixed()
    .nullable()
    .test("fileSize", "File terlalu besar", (value) => {
      if (value && value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }
      return true;
    }),
});
