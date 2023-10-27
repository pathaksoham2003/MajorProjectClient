import React, { useEffect } from "react";
import styles from "./AllProducts.module.css";
import Card from "../allFeatureComponents/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  allProducts,
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
  }, []);
  return (<>
    {loading ? <Loading/> : (<div className={styles.contain}>
      
      <div className={styles.filter}>
        <hr />
        <h3 onClick={()=>dispatch(allProducts())}>All Products</h3>
        <hr />
       <h3>Search Product</h3>
        <input
          className={styles.search}
          placeholder="Search"
          type="text"
          onChange={(e) => dispatch(searchProducts(e.target.value))}
        />
        <hr />
        <h3>Categories</h3>
        {uniqCategories.map((val) => {
          return (
            <div onClick={() => dispatch(getCategory(val))}>
              <label>{val}</label>
              <h5></h5>
            </div>
          );
        })}
        <hr />
        <h3>Brands</h3>
        {uniqBrands.map((val) => {
          return (
            <div onClick={() => dispatch(getBrand(val))}>
              <label>{val}</label>
              <h5></h5>
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
        <hr/>
        <h3>Price</h3>
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
