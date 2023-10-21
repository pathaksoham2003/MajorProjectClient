import React, { useState } from "react";
import styles from "./FavoriteProducts.module.css";
import CardStrip from "./CardStrip";
import { useSelector } from "react-redux";
import { favoriteSelector } from "./favoriteProductsSlice";
const FavoriteProducts = () => {
  const data = useSelector(favoriteSelector);
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h3>Product Image</h3>
        <div className={styles.info}>
          <h3>Product Name</h3>
          <h3>Product Price</h3>
          <h3>Product Rating</h3>
          <h3>Add To Cart</h3>
          <h3>Buy Now</h3>
        </div>
      </div>
      {data.length === 0 ? (
        <h1>No Favorite Items</h1>
      ) : (
        data.map((data) => <CardStrip data={data} />)
      )}
    </div>
  );
};

export default FavoriteProducts;
