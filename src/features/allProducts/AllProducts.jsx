import React, { useEffect, useState } from "react";
import styles from "./AllProducts.module.css";
import Card from "../allFeatureComponents/Card";
import FilterDark from "../../assets/filter-light.svg?react"
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
import { selectFilterState, toogleFilter } from "../allFeatureSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const filteredProducts = useSelector(filteredProductsSelector);
  const uniqCategories = useSelector(getUniqueCat);
  const uniqBrands = useSelector(getUniqueBrands);
  const sidebar = useSelector(selectFilterState);
  useEffect(() => {
    dispatch(uniqueBrands());
    dispatch(uniqueCategories());
  }, []);
  return (<>
    {loading ? <Loading/> : (<div className={styles.contain}>
      <div className={styles.filtericon} onClick={()=>dispatch(toogleFilter())}><FilterDark/></div>
      <div className={`${styles.filter} ${sidebar ? styles.active : ""}`}>
        <hr />
        <h3 onClick={()=>{dispatch(allProducts());dispatch(toogleFilter())}}>All Products</h3>
        <hr />
       <h3>Search Product</h3>
        <input
          className={styles.search}
          placeholder="Search"
          type="text"
          onChange={(e) =>{ dispatch(searchProducts(e.target.value));dispatch(toogleFilter())}}
        />
        <hr />
        <h3>Categories</h3>
        {uniqCategories.map((val) => {
          return (
            <div onClick={() =>{ dispatch(getCategory(val));dispatch(toogleFilter())}}>
              <label>{val}</label>
              <h5></h5>
            </div>
          );
        })}
        <hr />
        <h3>Brands</h3>
        {uniqBrands.map((val) => {
          return (
            <div onClick={() =>{ dispatch(getBrand(val));dispatch(toogleFilter())}}>
              <label>{val}</label>
              <h5></h5>
            </div>
          );
        })}
        <hr />
        <h3>Ratings</h3>
        <div className={styles.ratings}>
          <label onClick={()=>{dispatch(ratedProducts(1));dispatch(toogleFilter())}}>1</label>
          <label onClick={()=>{dispatch(ratedProducts(2));dispatch(toogleFilter())}}>2</label>
          <label onClick={()=>{dispatch(ratedProducts(3));dispatch(toogleFilter())}}>3</label>
          <label onClick={()=>{dispatch(ratedProducts(4));dispatch(toogleFilter())}}>4</label>
          <label onClick={()=>{dispatch(ratedProducts(5));dispatch(toogleFilter())}}>5</label>
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
