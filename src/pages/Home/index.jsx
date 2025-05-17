import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Promo from "./Promo";
import PromoElec from "./PromoElec";

const Home = () => {
  
  useEffect(() => {
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center bg-bgc">
      <div className="flex flex-col w-full max-w-[1440px]">
        <div>
          <Promo />
        </div>
        <div>
          <div>Top Category</div>
        </div>  
        <PromoElec />
        <div>Offers</div>
      </div>
    </div>
  );
};

export default Home;
