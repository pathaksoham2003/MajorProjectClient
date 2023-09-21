import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./pages/components/NavBar";

const Root = () => {
  
  return (
    <>
      <NavBar />
      <div className="outlet">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
