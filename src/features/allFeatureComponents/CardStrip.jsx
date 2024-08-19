import React from 'react';
import DarkHeartBreak from "../../assets/heart-break-svgrepo-com.svg?react";

const CardStrip = ({ data }) => {
  return (
    <div className="w-full m-[10px] p-[5px_10px] max-w-[1000px] flex justify-start items-center bg-bgc rounded-[10px] border-2 border-but relative">
      <div className="w-[200px] aspect-square">
        <button className="absolute top-0 left-0 m-2">
          <div>{<DarkHeartBreak />}</div>
        </button>
        <img src={data.imageUrl} className="w-full rounded-[10px]" />
      </div>
      <div className="w-[calc(100%-200px)] flex justify-around items-start h-[180px]">
        <h3 className="p-[0.5%] w-[19.5%] h-full text-h overflow-hidden">{data.name}</h3>
        <h3 className="p-[0.5%] w-[19.5%] h-full text-h overflow-hidden">{data.price}</h3>
        <h3 className="p-[0.5%] w-[19.5%] h-full text-h overflow-hidden">{data.rating}</h3>
        <button className="all-unset rounded-[10px] text-center bg-but text-bgc-acc font-bold h-[30px] m-[1%] w-[19%]">
          Add to Cart
        </button>
        <button className="all-unset rounded-[10px] text-center bg-but text-bgc-acc font-bold h-[30px] m-[1%] w-[19%]">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default CardStrip;
