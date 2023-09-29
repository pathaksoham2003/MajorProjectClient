import React, { useState } from 'react'
import styles from "./Login.module.css";
import { Link } from 'react-router-dom';
import Toast from './components/Toast';
const Register = () => {
  const [message , setMessage] = useState("");
  return (
    <div className={`${styles.container}`}>
      <Toast message={message}/>
      <div className={styles.box}>
        <h3>Register</h3>
        <input placeholder='Username'/>
        <input placeholder='Password'/>
        <input placeholder='Confirm Password'/>
        <h4>If you already have an account</h4>
        <Link to="/login">Click Here</Link>
      </div>
    </div>
  )
}

export default Register