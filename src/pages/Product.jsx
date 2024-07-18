import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  return (
    <div className="">
      <div className="text-2xl bg-red-500 dark:bg-blue-500 dark:text-4xl">Product{id}</div>
    </div>
  );
};

export default Product;
