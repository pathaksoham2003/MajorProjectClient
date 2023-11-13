import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./pages/components/NavBar";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { selectedTheme } from "./features/userInfo/userSlice";
const Root = () => {
  const theme = useSelector(selectedTheme);
  return (
    <>
      <NavBar />
      <ToastContainer autoClose={1500} theme={theme}/>
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
