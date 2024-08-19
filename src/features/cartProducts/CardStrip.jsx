import React from 'react'
import styles from "../allFeatureComponents/CardStrip.module.css";
import { useDispatch } from 'react-redux';
import { removeFromCart , incrementQuantity, decrementQuantity } from './cartProductsSlice';
const CardStrip = ({data}) => {
    const dispatch = useDispatch();
   return (
    <div className={styles.box}>
        <div className={styles.imageContainer}>
            <img src={data.item.mainimage}/></div>
        <div className={styles.information}>
            <h3>{data.item.name}</h3>
            <h3>{data.item.price}</h3>
            <div className={styles.increDecre}><span onClick={()=>dispatch(decrementQuantity(data.item.product_id))}>-</span><h4>{data.quantity}</h4><span  className={styles.left} onClick={()=> dispatch(incrementQuantity(data.item.product_id))}>+</span></div>
            <button onClick={()=> dispatch(removeFromCart(data.item))}>Remove Item</button>
            <button>Buy Now</button>
        </div>
    </div>
  )
}

export default CardStrip