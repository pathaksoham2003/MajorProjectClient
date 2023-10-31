import React, { useState ,useEffect} from "react";
import styles from "./NavBar.module.css";
import LightCart from "../../assets/cart-icon-light.svg?react";
import DarkCart from "../../assets/cart-icon-dark.svg?react";
import LightHeart from "../../assets/unfilled-heart-light.svg?react";
import DarkHeart from "../../assets/unfilled-heart-dark.svg?react"
import LightHamburger from "../../assets/hamburgerMenu-light.svg?react";
import DarkHamburger from "../../assets/hamburgerMenu-dark.svg?react";
import LightCross from "../../assets/close-light.svg?react";
import DarkCross from "../../assets/close-dark.svg?react";
import DarkMode from "./DarkMode.jsx";
import { Link } from "react-router-dom";
import { SELECTEDTHEME , USERID} from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectedTheme, setSelectedTheme } from "../../features/userInfo/userSlice";
const NavBar = () => {
  const user = useSelector(selectUser);
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useSelector(selectedTheme);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(SELECTEDTHEME){
      dispatch(setSelectedTheme(SELECTEDTHEME));
    }else{
      dispatch(setSelectedTheme("light"));
    }
  },[])
  useEffect(()=>{
    dispatch(setSelectedTheme(SELECTEDTHEME));
  },[SELECTEDTHEME])
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.brand}`}>
        Somazon
        <DarkMode />
      </div>
      <div className={`${styles.toggle}`}>
        <div className={`${styles.icons}`}>
          <Link to={`/favorite/${user.user_id}`}>
          {theme === "light" ? <LightHeart/> : <DarkHeart/>}
          </Link>
          <Link to={`/cart/${user.user_id}`}>
          {theme === "light" ? <LightCart/> : <DarkCart/>}
          </Link>
        </div>
        <div
          className={styles.hamburger}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          { isExpanded ?( theme==="light"? <LightCross/> : <DarkCross/> ):( theme==="light"? <LightHamburger/> : <DarkHamburger/>)}
        </div>
        <ul className={isExpanded ? `${styles.expandMenu}` : `${styles.menu}`}>
          <li onClick={() => setIsExpanded(false)}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setIsExpanded(false)}>
            <Link to="/products">Product</Link>
          </li>
          <li onClick={() => setIsExpanded(false)}>
            <Link to="/welcome">{user.user_id ? "Profile" : "Start Buying"}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
