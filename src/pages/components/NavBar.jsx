import React, { useState } from "react";
import styles from "./NavBar.module.css";
const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.brand}`}>
        ECommerce
      </div>
      <div>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
