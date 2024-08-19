import React from "react";
import styles from "../allFeatureComponents/CardStrip.module.css";
import { useDispatch } from "react-redux";
import {  removeFavorite } from "./favoriteProductsSlice";
const CardStrip = ({ data }) => {
  const dispatch = useDispatch();

  const removePro = () => {
    dispatch(removeFavorite(data));
  };
  return (
    <div className={styles.box}>
      <div className={styles.imageContainer}>
        <img src={data.mainimage} />
      </div>
      <div className={styles.information}>
        <h3>{data.name}</h3>
        <h3>{data.price}</h3>
        <h3>{data.rating}</h3>
        <button
          onClick={() => {
            removePro();
          }}
        >
          Remove Favorite
        </button>
        <button>Buy Now</button>
      </div>
    </div>
  );
};

export default CardStrip;
