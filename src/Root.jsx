import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NavBar from "./pages/components/NavBar";
import { useSelector } from "react-redux";
import { selectedTheme } from "./features/userInfo/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Root = () => {
  const theme = useSelector(selectedTheme);
  const navigation = useNavigate();

  useEffect(() => {
    const currentSearch = location.search;
    if (currentSearch == "?payment=success"){
      navigation("/success")
      // notifSuccess()
    }
    if (currentSearch == "?payment=failed"){
      navigation("/success")
    }
  }, []);

  return (
    <>
      <NavBar />
      <ToastContainer autoClose={1500} theme={theme} />
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
