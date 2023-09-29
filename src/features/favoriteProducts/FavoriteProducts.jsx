import React, { useState } from 'react'
import styles from "./FavoriteProducts.module.css";
import CardStrip from '../allFeatureComponents/CardStrip';
const FavoriteProducts = () => {
  const [data , setData ]  = useState([{
    name:"Marshal Headsetdsjavjdfjbdjfbjdfjsbnjdfnsbjkfdhjbvhjdbjvdjfbjdfjhbhdfbdjfbjkdfsjvbfhjdbvdjfbfbvhdfbvdfjvbbfdjfdvbdfjb",
    price:2000,
    rating:4,
    imageUrl:"https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg"
  },{
    name:"Marshal Headsetdsjavjdfjbdjfbjdfjsbnjdfnsbjkfdhjbvhjdbjvdjfbjdfjhbhdfbdjfbjkdfsjvbfhjdbvdjfbfbvhdfbvdfjvbbfdjfdvbdfjb",
    price:2000,
    rating:4,
    imageUrl:"https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg"
  },{
    name:"Marshal Headsetdsjavjdfjbdjfbjdfjsbnjdfnsbjkfdhjbvhjdbjvdjfbjdfjhbhdfbdjfbjkdfsjvbfhjdbvdjfbfbvhdfbvdfjvbbfdjfdvbdfjb",
    price:2000,
    rating:4,
    imageUrl:"https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg"
  },{
    name:"Marshal Headsetdsjavjdfjbdjfbjdfjsbnjdfnsbjkfdhjbvhjdbjvdjfbjdfjhbhdfbdjfbjkdfsjvbfhjdbvdjfbfbvhdfbvdfjvbbfdjfdvbdfjb",
    price:2000,
    rating:4,
    imageUrl:"https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg"
  },{
    name:"Marshal Headsetdsjavjdfjbdjfbjdfjsbnjdfnsbjkfdhjbvhjdbjvdjfbjdfjhbhdfbdjfbjkdfsjvbfhjdbvdjfbfbvhdfbvdfjvbbfdjfdvbdfjb",
    price:2000,
    rating:4,
    imageUrl:"https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg"
  },{
    name:"Marshal Headsetdsjavjdfjbdjfbjdfjsbnjdfnsbjkfdhjbvhjdbjvdjfbjdfjhbhdfbdjfbjkdfsjvbfhjdbvdjfbfbvhdfbvdfjvbbfdjfdvbdfjb",
    price:2000,
    rating:4,
    imageUrl:"https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg"
  },{
    name:"Marshal Headsetdsjavjdfjbdjfbjdfjsbnjdfnsbjkfdhjbvhjdbjvdjfbjdfjhbhdfbdjfbjkdfsjvbfhjdbvdjfbfbvhdfbvdfjvbbfdjfdvbdfjb",
    price:2000,
    rating:4,
    imageUrl:"https://i.pinimg.com/550x/49/44/55/4944553088c4c7009154e4093738f549.jpg"
  }])
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
      {data.map((data)=> (<CardStrip data={data}/>))}
    </div>
  )
}

export default FavoriteProducts