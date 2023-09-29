import React from 'react'
import styles from "./Toast.module.css";

const Toast = ({message}) => {
  return (
    <>
    { message.length === 0 ? <></> : <div className={styles.container}>{message}</div>}
    </>
  )
}

export default Toast