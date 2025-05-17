import React from "react";
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";

const Buyer = () => {
  return (
    <div className="w-full min-h-screen flex justify-center bg-bgc">
      <div className="flex flex-col w-full max-w-[1440px]">
        <div className="flex min-h-screen bg-background text-text">
          <Sidebar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Buyer;
