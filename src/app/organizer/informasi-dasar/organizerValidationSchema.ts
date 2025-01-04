import * as Yup from "yup";

export const organizerValidationSchema = Yup.object({
  email: Yup.string().email("Email tidak valid").required("Email diperlukan"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Nomor ponsel tidak valid")
    .required("Nomor ponsel diperlukan"),
  firstName: Yup.string().required("Nama depan diperlukan"),
  lastName: Yup.string().required("Nama belakang diperlukan"),
  birthDate: Yup.date().required("Tanggal lahir diperlukan"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Pilih jenis kelamin")
    .required("jenis kelamin dioerlukan"),
  profilePicture: Yup.mixed()
    .nullable()
    .test("fileSize", "File terlalu besar", (value) => {
      if (value && value instanceof File) {
        return value.size <= 5 * 1024 * 1024;
      }
      return true;
    }),
  companyName: Yup.string().required("Nama perusahaan diperlukan"),
  companyAddress: Yup.string().required("Alamat perusahaan diperlukan"),
  eventCategory: Yup.string().required("kategori acara diperlukan"),
});
