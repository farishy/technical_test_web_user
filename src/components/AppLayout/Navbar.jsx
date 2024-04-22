import styled from "@emotion/styled";
import { Icon, Input } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../services/auth/authSlice";
import { CheckMobile } from "../../helpers/helpers";
import Button from "@mostrans/web-components/components/base/Button";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  background-color: white;
  .navbar {
    display: flex;
    justify-content: space-between;
    .logo {
      max-height: 50px;
      margin: 0 1rem;
      padding: 0.25rem 0;
      cursor: pointer;
    }

    .link {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 1rem;
      .btn-login {
        border: 1px solid #6a0069;
        min-width: 100px;
        padding: 0.5rem 1rem;
        display: flex;
        gap: 1rem;
        background-color: #6a0069;
        color: white;
        border-radius: 1rem 0 0 1rem;
        cursor: pointer;
      }

      .btn-login:hover {
        background-color: #4a0049;
        border: 1px solid #4a0049;
      }

      .btn-signup {
        min-width: 100px;
        padding: 0.5rem 1rem;
        display: flex;
        gap: 1rem;
        border: 1px solid #6a0069;
        border-radius: 0 1rem 1rem 0;
        cursor: pointer;
        color: #4a0049;
      }

      .btn-signup:hover {
        background-color: #c399c3;
        border: 1px solid #c399c3;
      }

      .btn-logout {
        border: 1px solid #6a0069;
        min-width: 100px;
        padding: 0.5rem 1rem;
        display: flex;
        gap: 1rem;
        background-color: #6a0069;
        color: white;
        cursor: pointer;
      }

      .btn-logout:hover {
        background-color: #4a0049;
        border: 1px solid #4a0049;
      }
    }

    .menu-hamburger {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 40px;
      width: 40px;
      background-color: #6a0069;
      color: white;
      margin-right: 1rem;
      border-radius: 1rem;
      .btn-icon {
        font-size: 25px;
      }
    }
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
    gap: 1.5rem;
    background-color: #6a0069;
    .menu-item {
      padding: 0.5rem 1rem;
      background-color: white;
      display: flex;
      gap: 1rem;
      cursor: pointer;
      border-radius: 1rem;
      color: #4a0049;
    }
    .menu-item:hover {
      background-color: #c399c3;
    }
  }
`;

export default function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = CheckMobile();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsLogin(true);
    }
  }, [currentUser, setIsLogin]);

  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    window.location.reload();
  };

  const LinkMenu = () =>
    isLogin ? (
      <div className="link">
        <span className="me-3">
          Hello <b>{currentUser?.namaLengkap}</b>,
        </span>
        <div className="btn-logout" onClick={handleLogout}>
          <LogoutIcon />
          <b>Logout</b>
        </div>
      </div>
    ) : (
      <div className="link">
        <div className="btn-login" onClick={() => navigate("/login")}>
          <LoginIcon />
          <b>Masuk</b>
        </div>

        <div className="btn-signup" onClick={() => navigate("/register")}>
          <PersonAddAlt1 />
          <b>Daftar</b>
        </div>
      </div>
    );

  const ListMenu = () =>
    isLogin ? (
      <div className="menu-list">
        <span className="me-3 text-white">
          Hello <b>{currentUser?.namaLengkap}</b>,
        </span>
        <div className="menu-item" onClick={handleLogout}>
          <LogoutIcon />
          <b>Logout</b>
        </div>
      </div>
    ) : (
      <div className="menu-list">
        <div className="menu-item" onClick={() => navigate("/login")}>
          <LoginIcon />
          <b>Masuk</b>
        </div>
        <div className="menu-item" onClick={() => navigate("/register")}>
          <PersonAddAlt1 />
          <b>Daftar</b>
        </div>
      </div>
    );

  return (
    <NavbarContainer>
      <div className="navbar">
        <img
          className="logo"
          src="https://image.cermati.com/v1435837667/sharia/wiwturax8bnvrypeb4ic.png"
          onClick={() => navigate("/")}
        />
        {!isMobile ? (
          <LinkMenu />
        ) : (
          <div className="menu-hamburger" onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? <MenuIcon className="btn-icon" /> : <MenuOpenIcon />}
          </div>
        )}
      </div>
      {isOpen ? <ListMenu /> : null}
    </NavbarContainer>
  );
}
