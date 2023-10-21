import React from 'react'
import styles from "../allFeatureComponents/CardStrip.module.css";
import DarkHeartBreak from "../../assets/heart-break-svgrepo-com.svg?react";
import { useDispatch } from 'react-redux';
const CardStrip = ({data}) => {
    const dispatch = useDispatch();
   return (
    <div className={styles.box}>
        <div className={styles.imageContainer}>
        <button className={styles.heart}><div>{<DarkHeartBreak/>}</div></button>
            <img src={data.imageUrl}/></div>
        <div className={styles.information}>
            <h3>{data.name}</h3>
            <h3>{data.price}</h3>
            <h3>{data.rating}</h3>
            <button onClick={()=>{}}>Remove Favorite</button>
            <button>Buy Now</button>
        </div>
    </div>
  )
}

export default CardStrip