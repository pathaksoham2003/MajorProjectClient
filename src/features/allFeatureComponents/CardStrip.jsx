import React from 'react'
import styles from "./CardStrip.module.css";
import HeartBreak from "../../assets/heart-break-svgrepo-com.svg?react";
import LightHeartBreak from "../../assets/light-heart-break-svgrepo-com.svg?react"
const CardStrip = ({data}) => {
  const lightTheme = document.body.getAttribute("data-theme") === null || document.body.getAttribute("data-theme")==="light";
  return (
    <div className={styles.box}>
        <div className={styles.imageContainer}>
        <button className={styles.heart}><div>{lightTheme === true ? <HeartBreak/> : <LightHeartBreak/>}</div></button>
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