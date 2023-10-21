import React from 'react'
import styles from "./CardStrip.module.css";
import DarkHeartBreak from "../../assets/heart-break-svgrepo-com.svg?react";
const CardStrip = ({data}) => {
   return (
    <div className={styles.box}>
        <div className={styles.imageContainer}>
        <button className={styles.heart}><div>{<DarkHeartBreak/>}</div></button>
            <img src={data.imageUrl}/></div>
        <div className={styles.information}>
            <h3>{data.name}</h3>
            <h3>{data.price}</h3>
            <h3>{data.rating}</h3>
            <button>Add to Cart</button>
            <button>Buy Now</button>
        </div>
    </div>
  )
}

export default CardStrip