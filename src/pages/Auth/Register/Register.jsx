import { Input, Link } from "@mui/material";
import styled from "@emotion/styled";
import { Controller } from "react-hook-form";
import FormGroup from "../../../components/Base/FormGroup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useRegisterViewModel } from "./useRegisterViewModel";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../../services/auth/authSlice";
import Swal from "sweetalert2";
import Button from "@mostrans/web-components/components/base/Button";

const Container = styled.div`
  .background {
    background-image: url("https://thumbs.dreamstime.com/z/happy-muslim-women-female-hijab-call-center-customer-support-executive-headset-working-office-education-online-221010992.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    .logo {
      width: 500px;
      cursor: pointer;
      @media only screen and (max-device-width: 480px) {
        width: 250px;
      }
    }

    .background-overlay {
      min-height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      /* padding-left: 10rem; */
      display: flex;
      flex-direction: column;
      justify-content: center;

      .content-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 2rem 1rem;
        @media only screen and (max-width: 1024px) {
          grid-template-columns: 1fr;
          row-gap: 2rem;

          margin: 2rem 1rem;
          /* margin: 0rem; */
        }
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: white;
      min-height: 300px;
      max-width: 550px;
      border-radius: 1rem;
      padding: 2rem;

      @media only screen and (max-device-width: 480px) {
        width: 325px;
      }

      .input-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        @media only screen and (max-device-width: 480px) {
          grid-template-columns: 1fr;
          row-gap: 1rem;
        }
      }
    }
  }
`;

export default function Register() {
  const { form } = useRegisterViewModel();
  const [isVisible, setIsVisible] = useState(false);
  const [isKonfirmasiVisible, setIsKonfirmasiVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleRegister = async (data) => {
    const newData = { ...data };
    delete newData.konfirmasiPassword;
    newData.role = "USER";
    dispatch(register(newData));
  };

  useEffect(() => {
    if (isError) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (isSuccess) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <Container>
      <div className="background">
        <div className="background-overlay">
          <div className="content-container">
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              //   style={{ paddingLeft: "10rem" }}
            >
              <img
                src="https://image.cermati.com/v1435837667/sharia/wiwturax8bnvrypeb4ic.png"
                className="logo"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="d-flex justify-content-center">
              <div className="form">
                <div className="d-flex flex-column">
                  <h3>Formulir Pendaftaran</h3>
                  {/* <span>
                    Belum memiliki akun? <Link href="#">Klik disini!</Link>
                  </span> */}
                </div>
                <div className="input-container">
                  <Controller
                    control={form.control}
                    name="namaLengkap"
                    render={({ field, fieldState }) => (
                      <FormGroup
                        className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                        label="Nama Lengkap"
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
                    name="username"
                    render={({ field, fieldState }) => (
                      <FormGroup
                        className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                        label="Username"
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
                </div>
                <div className="input-container">
                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormGroup
                        className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                        label="Email"
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
                    name="phone"
                    render={({ field, fieldState }) => (
                      <FormGroup
                        className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                        label="Nomor Handphone"
                        isRequired
                        showChildErrorSign
                        errorMessage={fieldState?.error?.message}
                        isError={!!fieldState?.error}>
                        <Input
                          type="tel"
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

                <div className="input-container">
                  <Controller
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormGroup
                        className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                        label="Password"
                        isRequired
                        showChildErrorSign
                        errorMessage={fieldState?.error?.message}
                        isError={!!fieldState?.error}>
                        <Input
                          type={isVisible ? "text" : "password"}
                          className="text-center mt-1 w-100"
                          onBlur={field.onBlur}
                          ref={field.ref}
                          value={field.value}
                          onChange={field.onChange}
                          endAdornment={
                            isVisible ? (
                              <VisibilityOffIcon
                                sx={{ cursor: "pointer" }}
                                fontSize="small"
                                onClick={() => setIsVisible(!isVisible)}
                              />
                            ) : (
                              <VisibilityIcon
                                sx={{ cursor: "pointer" }}
                                fontSize="small"
                                onClick={() => setIsVisible(!isVisible)}
                              />
                            )
                          }
                          {...field}
                        />
                      </FormGroup>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="konfirmasiPassword"
                    render={({ field, fieldState }) => (
                      <FormGroup
                        className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                        label="Konfirmasi Password"
                        isRequired
                        showChildErrorSign
                        errorMessage={fieldState?.error?.message}
                        isError={!!fieldState?.error}>
                        <Input
                          type={isKonfirmasiVisible ? "text" : "password"}
                          className="text-center mt-1 w-100"
                          onBlur={field.onBlur}
                          ref={field.ref}
                          value={field.value}
                          onChange={field.onChange}
                          endAdornment={
                            isKonfirmasiVisible ? (
                              <VisibilityOffIcon
                                sx={{ cursor: "pointer" }}
                                fontSize="small"
                                onClick={() =>
                                  setIsKonfirmasiVisible(!isKonfirmasiVisible)
                                }
                              />
                            ) : (
                              <VisibilityIcon
                                sx={{ cursor: "pointer" }}
                                fontSize="small"
                                onClick={() =>
                                  setIsKonfirmasiVisible(!isKonfirmasiVisible)
                                }
                              />
                            )
                          }
                          {...field}
                        />
                      </FormGroup>
                    )}
                  />
                </div>

                <Button
                  variant="contained"
                  onClick={form.handleSubmit(handleRegister)}>
                  Daftar
                </Button>
                <Button
                  startIcon={<ArrowBackIcon />}
                  className="text-left w-auto mr-auto"
                  onClick={() => navigate("/login")}>
                  Ke halaman masuk
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
