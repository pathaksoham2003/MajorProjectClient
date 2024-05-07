import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/allProducts/allProductsSlice";
import styles from "./Home.module.css";
import {
  selectSliderImages,
} from "../features/allFeatureSlice";
import CatHolder from "./components/CatHolder";
import { Carousel } from 'react-responsive-carousel';

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
        <div style={{position:"absolute",top:"200px",right:"80px",width:"50%"}}>
          <span style={{fontSize:60,lineHeight:1,fontStyle:"italic",fontFamily:"cursive",fontWeight:"600"}}>Welcome to the realm of endless possibilities,</span>
          <br/>
          <span style={{paddingLeft:10,fontSize:20,fontStyle:"italic",paddingTop:20,fontWeight:"500"}}>Where every click unveils a new adventure in style and sophistication. </span>
          <br/>
          <span style={{paddingLeft:10,fontSize:20,fontStyle:"italic",fontWeight:"500"}}>Step into our world and let your journey to extraordinary begin.</span>
        </div>
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
