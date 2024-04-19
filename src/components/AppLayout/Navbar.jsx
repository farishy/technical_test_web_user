import styled from "@emotion/styled";
import { Icon, Input } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../services/auth/authSlice";
import { CheckMobile } from "../../helpers/helpers";
import Button from "@mostrans/web-components/components/base/Button";

const AuthContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  /* justify-content: end; */
  align-items: center;
  padding: 0.5rem 1rem;
  gap: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  align-items: center;

  .logo img {
    height: 50px;
  }
`;
const LinkContainer = styled.div`
  display: flex;
  background-color: #6a0069;
  height: 5px;
`;

export default function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = CheckMobile();

  useEffect(() => {
    if (currentUser) {
      setIsLogin(true);
    }
  }, [currentUser, setIsLogin]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="d-flex flex-column">
      <AuthContainer>
        <div className="logo d-flex align-items-center gap-1">
          <img src="https://image.cermati.com/v1435837667/sharia/wiwturax8bnvrypeb4ic.png" />
          {/* {!isMobile ? <b className="my-auto">Aplikasi Absen Karyawan</b> : null} */}
        </div>
        <div className="d-flex"></div>
        <div className="d-flex gap-1 justify-content-end align-items-center">
          {isLogin ? (
            <>
              <span>Hello, {currentUser?.namaLengkap}</span>
              <Button
                variant="text"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => navigate("/login")}>
                Masuk
              </Button>
              <Button variant="outlined" onClick={() => navigate("/register")}>
                Daftar
              </Button>
            </>
          )}
        </div>
      </AuthContainer>
      <LinkContainer></LinkContainer>
    </div>
  );
}
