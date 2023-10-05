import React from 'react'
import styles from "./GoogleLogin.module.css";
import {googleLogout,useGoogleLogin} from "@react-oauth/google";

const GoogleLogin = () => {


  const login = () => {
    useGoogleLogin({
      onSuccess : () => {},
      onError : () => {},
    })
  }

  return (
    <div className={styles.container}>
      <div>
      <button onClick={login}>Sign In With Google 🚀</button>
      <hr/>
      <button onClick ={()=>{}}>GUEST LOGIN</button>
      </div>
    </div>
  )
}

export default GoogleLogin