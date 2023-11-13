import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import { toast } from "react-toastify";
import { checkUser, postData } from "../features/userInfo/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const validEmail = /^[a-zA-Z0-9]+@(?:[a-z]+\.)+[A-Za-z]+$/
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleValidation = () => {
    if(!user.email || !user.password){
      toast.warn("Fill in the credentials")
      return false;
    }
    if(!validEmail.test(user.email)){
      toast.warn("Entered Email Is Not Valid")
      return false;
    }
    if(user.password.length < 8){
      toast.warn("Short Password")
      return false;
    }
    if(!/^(?=.*[a-zA-Z])(?=.*\d).+/.test(user.password)){
      toast.warn("Password must contain digit")
      return false;
    }
    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!handleValidation()){
      return;  
    }else{
      dispatch(checkUser(user)).then((data) => toast.warn(data.payload.message));
    }
  };
  return (
    <div className={`${styles.container}`}>
      <form className={styles.box}>
        <h3>Login</h3>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <h4>If you don't have an account </h4>
        <Link to="/register">Click Here</Link>
        <button type="submit" onClick={handleSubmit}>
          Proceed to Login
        </button>
        <hr />
        <GoogleLogin />
        <button>🤵 Guest Login</button>
      </form>
    </div>
  );
};

export default Login;
