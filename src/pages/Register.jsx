import React, { useState } from 'react'
import styles from "./Login.module.css";
import { Link } from 'react-router-dom';
import Toast from './components/Toast';
import GoogleLogin from './components/GoogleLogin';
const Register = () => {
  const [message , setMessage] = useState("");
  return (
    <form className={`${styles.container}`}>
      <Toast message={message}/>
      <div className={styles.box}>
        <h3>Register</h3>
        <input placeholder='Email'/>
        <input placeholder='Password'/>
        <input placeholder='Confirm Password'/>
        <h4>If you already have an account</h4>
        <Link to="/login">Click Here</Link>
        <button type="submit">Proceed</button>
        <hr/>
        <GoogleLogin/>
        <button>🤵 Guest Login</button>
      </div>
    </form>
  )
}

export default Register