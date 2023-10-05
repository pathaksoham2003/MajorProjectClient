import React, { useState } from "react";
import styles from "./NavBar.module.css";
import Cart from "../../assets/cart-icon.svg";
import Heart from "../../assets/favorite-svgrepo-com.svg";
import HamburgerMenu from "../../assets/hamburgerMenu.svg";
import Cross from "../../assets/close.svg";
import DarkMode from "./DarkMode.jsx";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.brand}`}>
        ECommerce
        <DarkMode />
      </div>
      <div className={`${styles.toggle}`}>
        <div className={`${styles.icons}`}>
          <Link to={`favorite/1`}>
            <img className={styles.heart} src={Heart} />
          </Link>
          <Link to={`cart`}>
            <img className={styles.cart} src={Cart} />
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
            <Link to="/welcome">Start Buying</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
