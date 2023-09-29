import React, { useState } from 'react'
import styles from "./Card.module.css";
const Card = () => {
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
    data.map((data)=> (<div className={styles.box}>
      <div className={styles.imageContainer}>
      <img src={data.imageUrl}/>
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
      <button>Add To Cart</button>
      <button>Buy Now</button>
      </div>
    </div>))
  )
}

export default Card