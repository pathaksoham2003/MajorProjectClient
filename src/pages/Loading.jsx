import React from 'react'
import HashLoader from "react-spinners/HashLoader";
import styles from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={styles.container}><HashLoader
    color="#36d7b7"
    size={150}
    speedMultiplier={1.2}
  /></div>
  )
}

export default Loading