import React, { useState ,useEffect} from "react";
import styles from "./NavBar.module.css";
import LightCart from "../../assets/cart-icon-light.svg?react";
import DarkCart from "../../assets/cart-icon-dark.svg?react";
import LightHeart from "../../assets/unfilled-heart-light.svg?react";
import DarkHeart from "../../assets/unfilled-heart-dark.svg?react"
import HamburgerMenu from "../../assets/hamburgerMenu.svg";
import Cross from "../../assets/close.svg";
import DarkMode from "./DarkMode.jsx";
import { Link } from "react-router-dom";
import { SELECTEDTHEME , google_id} from "../../utils/api";
const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [theme,setTheme] = useState("");
  useEffect(()=>{
    if(SELECTEDTHEME){
      setTheme(SELECTEDTHEME);
    }else{
      setTheme("light")
    }
  },[])
  useEffect(()=>{
    setTheme(SELECTEDTHEME);
  },[SELECTEDTHEME])
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.brand}`}>
        Somazon
        <DarkMode />
      </div>
      <div className={`${styles.toggle}`}>
        <div className={`${styles.icons}`}>
          <Link to={`favorite/1`}>
          {SELECTEDTHEME === "light" ? <LightHeart/> : <DarkHeart/>}
          </Link>
          <Link to={`cart`}>
          {SELECTEDTHEME === "light" ? <LightCart/> : <DarkCart/>}
          </Link>
        </div>
        <div
          className={styles.hamburger}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? <img src={Cross} /> : <img src={HamburgerMenu} />}
        </div>
        <ul className={isExpanded ? `${styles.expandMenu}` : `${styles.menu}`}>
          <li onClick={() => setIsExpanded(false)}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setIsExpanded(false)}>
            <Link to="/products">Product</Link>
          </li>
          <li onClick={() => setIsExpanded(false)}>
            <Link to="/welcome">{google_id ? "Profile" : "Start Buying"}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
