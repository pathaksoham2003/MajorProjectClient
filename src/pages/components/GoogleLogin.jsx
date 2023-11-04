import React from "react";
import styles from "./GoogleLogin.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch} from "react-redux";
import { postData } from "../../features/userInfo/userSlice";
import { useNavigate } from "react-router-dom";
const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useGoogleLogin({
      onSuccess: (response) => getUser(response.access_token),
      onError: (error) => console.log("Login : Failed : ", error),
    });

  const getUser = (token) => {
    if (token) {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => {
        const data = await res.json();
        const { email, name, picture } = data;
        dispatch(postData({ name, email, picture }));
        navigate("/profile");
      });
    }
  };
  return (
   <>
          <button onClick={(e)=>{e.preventDefault(); login()}}>Sign In With Google 🚀</button>
</>
  );
};

export default GoogleLogin;
