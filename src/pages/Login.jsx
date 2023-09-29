import React, { useState } from 'react'
import styles from "./Login.module.css"
import { Link } from 'react-router-dom'
import Toast from './components/Toast'
const Login = () => {
  const [message,setMessage] = useState("");
  return (
    <div className={`${styles.container}`}>
      <Toast message={message}/>
      <div className={styles.box}>
        <h3>Login</h3>
        <input placeholder='Username'/>
        <input placeholder='Password'/>
        <h4>If you don't have an account</h4>
        <Link to="/register">Click Here</Link>
      </div>
    </div>
  )
}

export default Login