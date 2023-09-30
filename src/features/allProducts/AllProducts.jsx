import React, { useState } from 'react'
import styles from "./AllProducts.module.css";
import Card from '../allFeatureComponents/Card'
const AllProducts = () => {
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
      {data.map((data)=> (
      <Card data={data}/>
      ))}
    </div>
  )
}

export default AllProducts