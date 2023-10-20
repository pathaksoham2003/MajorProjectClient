import React, { useEffect, useState } from "react";
import styles from "./AllProducts.module.css";
import Card from "../allFeatureComponents/Card";
import HashLoader from "react-spinners/HashLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  filteredProductsSelector,
  getBrand,
  getCategory,
  getUniqueBrands,
  getUniqueCat,
  loadData,
  loadingSelector,
  ratedProducts,
  searchProducts,
  uniqueBrands,
  uniqueCategories,
} from "./allProductsSlice";
import Loading from "../../pages/Loading";

const AllProducts = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const filteredProducts = useSelector(filteredProductsSelector);
  const uniqCategories = useSelector(getUniqueCat);
  const uniqBrands = useSelector(getUniqueBrands);
  useEffect(() => {
    dispatch(uniqueBrands());
    dispatch(uniqueCategories());
    dispatch(
      loadData([
        {
          product_id:"1",
          name: "Tv",
          price: 1100,
          rating: 1,
          category: "electronics",
          brand: "mac",
          quantity: 100,
          imageUrl:
            "https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg",
        },
        {
          product_id:"2",
          name: "Watch",
          price: 1200,
          rating: 3,
          category: "accessories",
          quantity: 10,
          brand: "rolex",
          imageUrl:
            "https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg",
        },
        {
          product_id:"3",
          name: "Phone",
          price: 800,
          rating: 2,
          category: "electronics",
          quantity: 500,
          brand: "samsung",
          imageUrl:
            "https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg",
        },
        {
          product_id:"4",
          name: "Frock",
          price: 1000,
          rating: 5,
          category: "womens",
          quantity: 20,
          brand: "floral",
          imageUrl:
            "https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg",
        },
        {
          product_id:"5",
          name: "Jeans",
          price: 500,
          rating: 4,
          category: "mens",
          quantity: 30,
          brand: "jordan",
          imageUrl:
            "https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg",
        },
        {
          product_id:"6",
          name: "Tshirt",
          price: 200,
          rating: 1,
          category: "mens",
          quantity: 30,
          brand: "us polo",
          imageUrl:
            "https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg",
        },
        {
          product_id:"7",
          name: "Marshal",
          price: 100,
          rating: 5,
          category: "electronics",
          brand: "lg",
          quantity: 500,
          imageUrl:
            "https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg",
        },
      ])
    );
  }, []);
  return (<>
    {loading ? <Loading/> : (<div className={styles.contain}>
      
      <div className={styles.filter}>
        <hr />
        <h3>Search Product</h3>
        <input
          className={styles.search}
          placeholder="Search"
          type="text"
          onChange={(e) => dispatch(searchProducts(e.target.value))}
        />
        <hr />
        <h3>Product Type</h3>
        {uniqCategories.map((val) => {
          return (
            <div onClick={() => dispatch(getCategory(val))}>
              <label>{val}</label>
              <h5>20</h5>
            </div>
          );
        })}
        <hr />
        <h3>Brands</h3>
        {uniqBrands.map((val) => {
          return (
            <div onClick={() => dispatch(getBrand(val))}>
              <label>{val}</label>
              <h5>20</h5>
            </div>
          );
        })}
        <hr />
        <h3>Ratings</h3>
        <div className={styles.ratings}>
          <label onClick={()=>dispatch(ratedProducts(1))}>1</label>
          <label onClick={()=>dispatch(ratedProducts(2))}>2</label>
          <label onClick={()=>dispatch(ratedProducts(3))}>3</label>
          <label onClick={()=>dispatch(ratedProducts(4))}>4</label>
          <label onClick={()=>dispatch(ratedProducts(5))}>5</label>
        </div>
      </div>

      <div className={styles.container}>
        {filteredProducts.map((data) => (
          <Card data={data} />
        ))}
      </div>
    </div>)}
    </>);
};

export default AllProducts;
