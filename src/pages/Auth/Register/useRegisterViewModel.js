import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  namaLengkap: yup
    .string()
    .required("Masukkan nama lengkap")
    .matches(/^[A-Za-z ]*$/, "Format nama lengkap yang dimasukkan salah"),
  username: yup.string().required("Masukkan username"),
  email: yup
    .string()
    .required("Masukkan email")
    .email("Format email yang dimasukkan salah"),
  password: yup.string().required("Masukkan password"),
  konfirmasiPassword: yup
    .string()
    .required("Masukkan konfirmasi password")
    .oneOf([yup.ref("password"), null], "Password harus sama"),
  phone: yup
    .string()
    .required("Masukkan nomor handphone")
    .test("is-valid-num", `Nomor handphone harus angka`, (val) => {
      return !isNaN(val);
    })
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Format nomor handphone salah"
    ),
});

export const useRegisterViewModel = () => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return {
    form,
  };
};
