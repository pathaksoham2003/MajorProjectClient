import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Toast from "./components/Toast";
import GoogleLogin from "./components/GoogleLogin";
const Login = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = () =>{

  }
  return (
    <div className={`${styles.container}`}>
      <Toast message={message} />
      <form className={styles.box}>
        <h3>Login</h3>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <h4>If you don't have an account </h4>
        <Link to="/register">Click Here</Link>
        <button type="submit" onClick={()=>handleSubmit()}>Proceed to Login</button>
        <hr />
        <GoogleLogin />
        <button>🤵 Guest Login</button>
      </form>
    </div>
  );
};

export default Login;
