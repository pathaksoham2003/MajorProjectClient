import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

const Seller = () => {
  const { id: sellerId } = useParams();

  return (
    <div className="w-full min-h-screen flex justify-center bg-bgc">
      <div className="flex flex-col w-full max-w-[1440px]">
        <div className="flex min-h-screen">
          <Sidebar sellerId={sellerId} />
          <div className="flex-1 p-6 bg-background max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
