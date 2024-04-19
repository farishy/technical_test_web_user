import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const useModalAddProductViewModel = () => {
  const schema = yup.object({
    isEdit: yup.bool(),
    id: yup.string().when("isEdit", {
      is: true,
      then: yup.string().required("Id diperlukan"),
    }),
    namaPaket: yup.string().required("Masukkan nama produk"),
    deskripsi: yup.string().required("Masukkan deskripsi produk"),
    urlImage: yup
      .string()
      .required("Masukkan link gambar produk")
      .matches(
        /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        "Link Gambar Tidak Valid"
      ),
    premi: yup
      .string()
      .required("Masukkan premi")
      .test("is-valid-num", `Harga Harus Angka`, (val) => {
        return !isNaN(val);
      })
      .test({
        name: "more-than",
        message: "Minimal Harga Rp0",
        test(val) {
          return val >= 0;
        },
      }),
    kategoriId: yup.object().required("Pilih kategori produk"),
  });

  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return {
    form,
  };
};
