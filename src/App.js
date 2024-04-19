import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-multi-carousel/lib/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import React from "react";
// import { ThemeProvider } from "react-bootstrap";
import { theme } from "./theme";
import ThemeProvider from "@mostrans/web-components/providers/ThemeProvider";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Absensi from "./pages/Absensi/Absensi";
import Dashboard from "./pages/Dashboard/Dashboard";
import MasterKaryawan from "./pages/Masterdata/Karyawan/Karyawan";
// import GlobalCss from "@mostrans/web-components/providers/GlobalCss";
import MasterAbsensi from "./pages/Masterdata/Absensi/Absensi";

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider additionalTheme={theme}>
        {/* <GlobalCss  /> */}
        <BrowserRouter>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/absensi" element={<Absensi />} />
            <Route path="/master-karyawan" element={<MasterKaryawan />} />
            <Route path="/master-absensi" element={<MasterAbsensi />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
