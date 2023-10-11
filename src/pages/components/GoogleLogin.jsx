import React, { useEffect, useState } from "react";
import styles from "./GoogleLogin.module.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { createUser, getSpecific ,google_id} from "../../utils/api";
import {useSelector , useDispatch} from "react-redux";
import { getSpecificUser , postData ,selectUser ,clearUser} from "../../features/userInfo/userSlice";
import Profile from "../Profile";

const GoogleLogin = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [google_id_state,setGoogleState] = useState(google_id);
  const [profile, setProfile] = useState({
    user_id: "",
    google_id: "",
    email: "",
    name: "",
    picture: "",
  });

  useEffect(() => {
    if (google_id_state) {
      dispatch(getSpecificUser(google_id_state));
    }
  }, []);

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
        const { id, email, name, picture } = data;
        dispatch(postData({ google_id: id, name, email, picture }));
        setGoogleState(id);
        localStorage.setItem("google_id", id);
      });
    }
  };

  const logOut = () => {
    googleLogout();
    setGoogleState("")
    dispatch(clearUser());
    localStorage.removeItem("google_id");
  };

  const guestLogin = () => {

  }

  return (
   <>
      {google_id_state ? (
          <Profile userData={user} logOut={logOut}/>
      ) : (
        <div className={styles.container}>
        <div>
          <button onClick={()=> login()}>Sign In With Google 🚀</button>
          <hr />
          <button onClick={() => guestLogin()}>GUEST LOGIN</button>
        </div>
        </div>
      )}
</>
  );
};

export default GoogleLogin;
