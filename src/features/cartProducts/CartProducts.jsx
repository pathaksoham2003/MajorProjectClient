import React from 'react'
import CardStrip from './CardStrip'
import { useSelector } from 'react-redux'
import { cartSelector } from './cartProductsSlice'
import styles from "../favoriteProducts/FavoriteProducts.module.css"
const CartProducts = () => {
  const cartItems = useSelector(cartSelector);
  console.log(cartItems)
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Cart Items</h1>
      <div className={styles.head}>
        <h3>Product Image</h3>
        <div className={styles.info}>
          <h3>Product Name</h3>
          <h3>Product Price</h3>
          <h3>Quantity</h3>
          <h3>Remove Item</h3>
          <h3>Buy Now</h3>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <h1 className={styles.empty}>No Favorite Items</h1>
      ) : (
        cartItems.map((data) => <CardStrip data={data} />)
      )}
    </div>
  )
}

export default CartProducts