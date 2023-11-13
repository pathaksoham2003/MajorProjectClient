import React from 'react'
import styles from "./Login.module.css";
import { Link } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin';
import { useDispatch } from 'react-redux';
import { postData } from '../features/userInfo/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const dispatch = useDispatch();


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
  


  return (
    <form className={`${styles.container}`}>
      <div className={styles.box}>
        <h3>Register</h3>
        <input placeholder='Name'/>
        <input placeholder='Email'/>
        <input placeholder='Password'/>
        <input placeholder='Confirm Password'/>
        <h4>If you already have an account</h4>
        <Link to="/login">Click Here</Link>
        <button type="submit" onClick ={(e)=>{e.preventDefault();dispatch(postData()).then((data)=>toast.warn(data.payload.message))}}>Proceed</button>
        <hr/>
        <GoogleLogin/>
        <button>🤵 Guest Login</button>
      </div>
    </form>
  )
}

export default Register