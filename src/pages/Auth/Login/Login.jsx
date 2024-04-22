import { Input, Link } from "@mui/material";
import styled from "@emotion/styled";
import { useLoginViewModel } from "./useLoginViewModel";
import { Controller } from "react-hook-form";
import FormGroup from "../../../components/Base/FormGroup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../services/auth/authSlice";
import LoadingSpinner from "../../../components/Base/LoadingSpinner";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "@mostrans/web-components/components/base/Button";

const Container = styled.div`
  .background {
    background-image: url("https://lh4.googleusercontent.com/hFhdTnZJFIWYA2zx2m8R36Q9zMYH56mlNuyMipLglPTPbrAHa7I1yrFVFn54ndx-jr-6voj0kCtKQIWfqIrqQ8nLO0njq6ut89m-b7M9_nM70InfTUFy0jq3DMVSJU5A1Hvs01Fh");
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;

    /* padding-left: 5rem; */

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
        @media only screen and (max-width: 1024px) {
          grid-template-columns: 1fr;
          row-gap: 1rem;
        }
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: white;
      min-height: 300px;
      width: 450px;
      border-radius: 1rem;
      padding: 2rem;

      @media only screen and (max-device-width: 480px) {
        width: 325px;
        padding: 2rem;
      }
    }
  }
`;

export default function Login() {
  const { form } = useLoginViewModel();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async (data) => {
    dispatch(login(data));
    if (isLoading) {
      return <LoadingSpinner />;
    }
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

    if (isSuccess || currentUser) {
      //   console.log(axios.defaults.headers);
      Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: true,
        // timer: ,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
      //   window.location.reload();
    }

    // dispatch(reset());
  }, [
    currentUser,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
    handleLogin,
  ]);

  return (
    <Container>
      <div className="background">
        <div className="background-overlay">
          <div className="content-container">
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              //   style={{ padding: "10rem" }}
            >
              <div className="d-flex gap-2"></div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="form">
                <div className="d-flex flex-column">
                  {/* <h1>Formulir Masuk</h1> */}
                  <img
                    src="https://image.cermati.com/v1435837667/sharia/wiwturax8bnvrypeb4ic.png"
                    className="mb-1 p-2 "
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  />
                </div>
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormGroup
                      // className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                      label="Email"
                      isRequired
                      showChildErrorSign
                      errorMessage={fieldState?.error?.message}
                      isError={!!fieldState?.error}>
                      <Input
                        type="text"
                        className="text-center w-100"
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
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormGroup
                      // className="my-lg-2 my-md-1 my-sm-1 my-1 w-100"
                      label="Password"
                      isRequired
                      showChildErrorSign
                      errorMessage={fieldState?.error?.message}
                      isError={!!fieldState?.error}>
                      <Input
                        type={isVisible ? "text" : "password"}
                        className="text-center w-100"
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
                <span>
                  Belum memiliki akun?{" "}
                  <Link onClick={() => navigate("/register")} href="#">
                    Klik disini!
                  </Link>
                </span>
                <Button
                  variant="contained"
                  onClick={form.handleSubmit(handleLogin)}>
                  Masuk
                </Button>
                <Button
                  startIcon={<ArrowBackIcon />}
                  className="text-left w-100 mr-auto"
                  onClick={() => navigate("/")}>
                  Ke halaman utama
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
