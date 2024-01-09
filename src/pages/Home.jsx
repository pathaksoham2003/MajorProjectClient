import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/allProducts/allProductsSlice";
import styles from "./Home.module.css";
import {
  selectSliderImages,
} from "../features/allFeatureSlice";
import CatHolder from "./components/CatHolder";

const Home = () => {
  const dispatch = useDispatch();
  const [currentImage,setCurrentImage] = useState(0);
  const sliderImages = useSelector(selectSliderImages);
  
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);
  
  useEffect(()=>{
    setTimeout(()=>{
      setCurrentImage((p)=>{
        if (p == sliderImages.length - 1){
          return 0;
        }
        return p+1
        });
    },3000)
  },[currentImage])

  return (
    <div className={styles.page}>
      <div className={styles.Colousal}>
        <img src={sliderImages[currentImage]} />
      </div>
      <div className={styles.categories}>
      <CatHolder category="electronics"/>
        <CatHolder category="womens"/>
        <CatHolder category="mens"/>  
      </div>
    </div>
  );
};

export default Home;
