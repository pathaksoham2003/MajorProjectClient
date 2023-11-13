import React, { useEffect } from 'react'
import styles from "./Toast.module.css";
import { useDispatch } from 'react-redux';

const Toast = ({message}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    if(message.length !== 0){
      setTimeout(()=>{
        dispatch(clearMessage())
      })
    }
  })
  return (
    <>
    { message.length === 0 ? <></> : <div className={styles.container}>{message}</div>}
    </>
  )
}

export default Toast