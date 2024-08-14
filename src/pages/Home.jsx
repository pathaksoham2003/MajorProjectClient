import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/allProducts/allProductsSlice";
import styles from "./Home.module.css";
import { selectSliderImages } from "../features/allFeatureSlice";
import CatHolder from "./components/CatHolder";
import { Carousel } from "react-responsive-carousel";
import { GucciPerfume, IphoneImage, PSFive } from "../images";

const Home = () => {
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const sliderImages = useSelector(selectSliderImages);


  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCurrentImage((p) => {
        if (p == sliderImages.length - 1) {
          return 0;
        }
        return p + 1;
      });
    }, 3000);
  }, [currentImage]);

  return (
    // <div className={styles.page}>
    //   <div className={styles.Colousal}>
    //     <div style={{position:"absolute",top:"200px",right:"80px",width:"50%"}}>
    //       <span style={{fontSize:60,lineHeight:1,fontStyle:"italic",fontFamily:"cursive",fontWeight:"600"}}>Welcome to the realm of endless possibilities,</span>
    //       <br/>
    //       <span style={{paddingLeft:10,fontSize:20,fontStyle:"italic",paddingTop:20,fontWeight:"500"}}>Where every click unveils a new adventure in style and sophistication. </span>
    //       <br/>
    //       <span style={{paddingLeft:10,fontSize:20,fontStyle:"italic",fontWeight:"500"}}>Step into our world and let your journey to extraordinary begin.</span>
    //     </div>
    //     <img src={sliderImages[currentImage]} />
    //   </div>
    //   <div className={styles.categories}>
    //   <CatHolder category="electronics"/>
    //     <CatHolder category="womens"/>
    //     <CatHolder category="mens"/>
    //   </div>
    // </div>
    <div
      className="w-full min-h-screen flex justify-center"
      style={{ backgroundColor: "var(--bgc)" }}
    >
      <div className="flex flex-col w-full max-w-[1440px]">
        <div className="flex sm:flex-row flex-col mt-5">
          <div className="sm:w-1/2 md:w-2/3 object-contain mb-2 mx-2 h-[221px] sm:h-[450px] rounded-2xl overflow-hidden relative">
            <img
              className="sm:object-center object-right object-fit sm:object-cover w-full h-full"
              src={IphoneImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(220,154,255,0.33)] via-[#ffffff00] to-[#ffffff00]"></div>
            <div className="absolute top-6 sm:top-20 left-6 md:left-10">
              <h2 className="text-white font-bold md:text-5xl sm:text-4xl text-3xl md:my-4 my-2">
                iPhone 14 <br className="sm:hidden block"/>Series
              </h2>
              <h2 className="text-white text-wrap sm:text-2xl md:text-3xl sm:my-2">
                Upto 10% off
                <br /> on specific vouchers
              </h2>
              <h2 className="text-white text-wrap sm:text-2xl md:text-2xl underline underline-offset-4 md:mt-8 my-2">Shop now</h2>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 flex h-[450px] flex-col">
            <div className="relative object-contain mx-2 mb-1 h-1/2 rounded-2xl overflow-hidden">
              <img
                className="object-center object-fit sm:object-cover w-full h-full"
                src={PSFive}
              />
              <div className="absolute top-10 left-6">
                <h2 className="text-white font-bold text-3xl sm:flex my-2">
                  PlayStation 5
                </h2>
                <h2 className="text-white text-wrap sm:flex my-2">
                  Black and White version
                  <br /> of the PS5 coming out on sale.
                </h2>
              </div>
            </div>
            <div className="relative object-contain mx-2 mt-1 h-1/2 rounded-2xl overflow-hidden">
              <img
                className="object-center object-fit sm:object-cover w-full h-full"
                src={GucciPerfume}
              />
              <div className="absolute top-10 left-6">
                <h2 className="text-white font-bold text-3xl sm:flex my-2">
                  Perfumes
                </h2>
                <h2 className="text-white text-wrap sm:flex my-2">
                  Gucci intense oud edp <br />
                  an all time favorite for parties.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.categories}>
          <CatHolder category="electronics" />
          <CatHolder category="womens" />
          <CatHolder category="mens" />
        </div>
        <div>Top Category</div>
        <div>Offers</div>
      </div>
    </div>
  );
};

export default Home;
