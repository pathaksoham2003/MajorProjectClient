import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getAllProduct} from "../features/allProducts/allProductsSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllProduct())
  },[])
  
  return (
    <div>Kindly Visit Other Pages This Page is in development. Visit products and favorite products page</div>
  )
}

export default Home