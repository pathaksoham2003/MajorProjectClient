import React, { useState } from 'react'
import styles from "./Card.module.css";
import CartIcon from "../../assets/cart-icon-hover.svg?react";
import FavoriteIcon from "../../assets/favorite-filled-svgrepo-com.svg?react";
import { useDispatch } from 'react-redux';
import { addToFavorite } from '../favoriteProducts/favoriteProductsSlice';
import { addToCart } from '../cartProducts/cartProductsSlice';
import { Link } from 'react-router-dom';
const Card = ({data}) => {
  const dispatch = useDispatch();
  return (
    <Link to={`/product/${data.product_id}`} className={styles.box}>
      <div className={styles.icons}>
        <div className={styles.icon1} onClick={()=>{dispatch(addToFavorite(data))}}><FavoriteIcon/></div>
        <div className={styles.icon2} onClick={()=>{dispatch(addToCart(data))}}><CartIcon/></div>
      </div>
      <div className={styles.imageContainer}>
        <img src={data.mainimage}/>
      </div>
      <h3>
        Name : {data.name}
      </h3>
      <div className={styles.contain}>
      <h3>
        Price {data.price}
      </h3>
      <h3>
        {data.rating}
      </h3>
      </div>
      <button>Buy Now</button>
    </Link>)
}

export default Card