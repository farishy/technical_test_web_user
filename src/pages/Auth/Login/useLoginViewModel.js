import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .required("Masukkan email")
    .email("Format email yang dimasukkan salah"),
  password: yup.string().required("Masukkan password"),
});

export const useLoginViewModel = () => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return {
    form,
  };
};
