import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Input,
} from "@mui/material";
import { CheckMobile } from "../../../../helpers/helpers";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { Controller } from "react-hook-form";
import { useModalAddProductViewModel } from "./useModalAddProductViewModel";
import FormGroup from "../../../../components/Base/FormGroup";
import Select from "react-select";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  updateProduct,
} from "../../../../services/product/productSlice";
import { useEffect } from "react";

const HeaderDialog = styled.div`
  /* margin-top: 1rem;
  margin-bottom: 1rem;
  */
  display: flex;
  border-bottom: 1px solid black;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  /* margin: auto; */
`;

export default function ModalAddProduct(props) {
  const { onClose, kategoriOptions, dataExist, isEdit } = props;
  const { isMobile } = CheckMobile();
  const { form } = useModalAddProductViewModel();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("kategoriOptions", form.watch("kategoriId"));

  const handleTambah = async (data) => {
    Swal.fire({
      title: "Yakin?",
      text: "Apakah anda yakin ingin menambahkan produk?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#097dc2",
      customClass: {
        container: "my-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        delete data.isEdit;
        delete data.id;
        data.kategoriId = data.kategoriId.id;
        try {
          dispatch(createProduct(data)).then((res) => {
            console.log("res", res);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Produk berhasil dibuat",
              showConfirmButton: true,
              customClass: {
                container: "my-swal",
              },
              // timer: ,
            }).then((result) => {
              if (result.isConfirmed) {
                onClose();
                navigate("/");
                window.location.reload();
              }
            });
            // navigate("/");
          });
        } catch (err) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.message,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: "my-swal",
            },
          });
        }
      }
    });
  };

  const handleEdit = async (data) => {
    Swal.fire({
      title: "Yakin?",
      text: "Apakah anda yakin ingin mengedit produk?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#097dc2",
      customClass: {
        container: "my-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let productData = { ...data };
        let productId = data.id;
        delete productData.isEdit;
        delete productData.id;
        productData.kategoriId = productData.kategoriId.id;
        try {
          console.log("testing", productId, productData);
          dispatch(updateProduct(productId, productData)).then((res) => {
            console.log("res", res);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Produk berhasil diubah",
              showConfirmButton: true,
              customClass: {
                container: "my-swal",
              },
              // timer: ,
            }).then((result) => {
              if (result.isConfirmed) {
                onClose();
                navigate("/");
                // window.location.reload();
              }
            });
            // navigate("/");
          });
        } catch (err) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: err.message,
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: "my-swal",
            },
          });
        }
      }
    });
  };

  useEffect(() => {
    if (Object.keys(dataExist).length === 0) return;
    form.setValue("isEdit", true);
    form.setValue("id", dataExist?.id);
    form.setValue("namaPaket", dataExist?.namaPaket);
    form.setValue(
      "kategoriId",
      kategoriOptions.filter((opt) => opt.id === dataExist.kategoriId)[0]
    );
    form.setValue("urlImage", dataExist?.urlImage);
    form.setValue("deskripsi", dataExist?.deskripsi);
    form.setValue("premi", dataExist?.premi);
    // form.setValue("namaPaket", dataExist.namaPaket);
  }, [dataExist, isEdit]);

  return (
    <>
      <Dialog
        open
        onClose={onClose}
        fullWidth
        fullScreen={isMobile ? true : false}>
        <HeaderDialog>
          <h4 className="my-auto">
            {!isEdit ? "Tambah Produk" : "Edit Produk"}
          </h4>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "#EB6440" }} />
          </IconButton>
        </HeaderDialog>
        <DialogContent className="d-flex flex-column gap-1">
          {isEdit ? (
            <div className="d-flex justify-content-center">
              <img
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                src={dataExist?.urlImage}
                alt="img_paket"
              />
            </div>
          ) : null}
          <Controller
            control={form.control}
            name="namaPaket"
            render={({ field, fieldState }) => (
              <FormGroup
                className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                label="Nama Produk"
                isRequired
                showChildErrorSign
                errorMessage={fieldState?.error?.message}
                isError={!!fieldState?.error}>
                <Input
                  type="text"
                  className="text-center mt-1 w-100"
                  onBlur={field.onBlur}
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  {...field}
                />
              </FormGroup>
            )}
          />
          <Controller
            control={form.control}
            name="kategoriId"
            render={({ field, fieldState }) => (
              <FormGroup
                className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                label="Kategori"
                isRequired
                showChildErrorSign
                errorMessage={fieldState?.error?.message}
                isError={!!fieldState?.error}>
                <Select
                  className="mt-1 w-100"
                  options={kategoriOptions.filter((p) => p.id != 0) || []}
                  getOptionLabel={(p) => p.namaKategori}
                  getOptionValue={(p) => p.id}
                  placeholder="Kategori produk..."
                  onBlur={field.onBlur}
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  {...field}
                />
              </FormGroup>
            )}
          />
          <Controller
            control={form.control}
            name="urlImage"
            render={({ field, fieldState }) => (
              <FormGroup
                className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                label="Link Gambar"
                isRequired
                showChildErrorSign
                errorMessage={fieldState?.error?.message}
                isError={!!fieldState?.error}>
                <Input
                  type="text"
                  className="text-center mt-1 w-100"
                  onBlur={field.onBlur}
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  {...field}
                />
              </FormGroup>
            )}
          />
          <Controller
            control={form.control}
            name="deskripsi"
            render={({ field, fieldState }) => (
              <FormGroup
                className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                label="Deskripsi"
                isRequired
                showChildErrorSign
                errorMessage={fieldState?.error?.message}
                isError={!!fieldState?.error}>
                <Input
                  type="text"
                  className="text-center mt-1 w-100"
                  onBlur={field.onBlur}
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                  multiline
                  {...field}
                />
              </FormGroup>
            )}
          />
          <div className="d-flex gap-3">
            <Controller
              control={form.control}
              name="premi"
              render={({ field, fieldState }) => (
                <FormGroup
                  className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                  label="Premi"
                  isRequired
                  showChildErrorSign
                  errorMessage={fieldState?.error?.message}
                  isError={!!fieldState?.error}>
                  <Input
                    type="num"
                    className="text-center mt-1 w-100"
                    onBlur={field.onBlur}
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    {...field}
                  />
                </FormGroup>
              )}
            />
          </div>
        </DialogContent>
        <DialogActions className="me-3 mb-3 gap-3">
          <Button color="error" onClick={onClose}>
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={
              isEdit
                ? form.handleSubmit(handleEdit)
                : form.handleSubmit(handleTambah)
            }>
            {isEdit ? "Simpan Produk" : "Tambah Produk"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
