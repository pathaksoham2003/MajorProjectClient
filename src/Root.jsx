import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
const Root = () => {
  const navigation = useNavigate();

  useEffect(() => {
    const currentSearch = location.search;
    if (currentSearch == "?payment=success") {
      navigation("/success");
      // notifSuccess()
    }
    if (currentSearch == "?payment=failed") {
      navigation("/failed");
    }
  }, []);

  return (
    <>
      <Nav />
      <ToastContainer
        position="top-left"
        autoClose={1500}
        theme={localStorage.getItem("theme") === "day" ? "light" : "dark"}
      />
      <div className="w-full h-full min-h-screen bg-background pt-[60px]">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default Root;
