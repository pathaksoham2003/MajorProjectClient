import React from 'react'
import styles from "./Login.module.css"
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className={`${styles.container}`}>
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