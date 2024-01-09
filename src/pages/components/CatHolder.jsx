import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../../features/allFeatureComponents/Card";
import { getAllProductsByCategory } from "../../utils/api";
const CatHolder = ({ category }) => {
  const [products, setProducts] = useState([]);

  const fetchCatPro = async (category) => {
    const response = await fetch(`${getAllProductsByCategory}/${category}`);
    const data = await response.json();
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    fetchCatPro(category);
  }, []);
  return (
    <>
      <h3 style={{ "font-size": "30px", padding: "5px 20px", color: "var(--but)"}}>
        {category.toUpperCase()}
      </h3>
      <div style={{ padding: "10px", display: "flex",overflowX:"scroll" }}>
        {products?.map((product) => {
          return <Card data={product} />;
        })}
      </div>
    </>
  );
};

export default CatHolder;
