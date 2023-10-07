import React, { useEffect, useState } from "react";
import styles from "./GoogleLogin.module.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { createUser, getSpecific ,google_id} from "../../utils/api";
import Profile from "../Profile";

const GoogleLogin = () => {
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
      getSpecificUser(google_id_state);
    }
  }, []);

  const getSpecificUser = async (google_id_state) => {
    const response = await fetch(`${getSpecific}${google_id_state}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setProfile(data);
  };

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
        setProfile({ google_id: id, name, email, picture });
        postData({ google_id: id, name, email, picture });
        setGoogleState(id);
        localStorage.setItem("google_id", id);
      });
    }
  };
  const postData = async (obj) => {
    const response = await fetch(createUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const data = await response.json();
    setProfile(data);
  };

  const logOut = () => {
    googleLogout();
    setGoogleState("")
    setProfile({
      user_id: "",
      google_id: "",
      name: "",
      email: "",
      picture: "",
    });
    localStorage.removeItem("google_id");
  };

  return (
    <div className={styles.container}>
      {google_id_state ? (
        <>
          <Profile userData={profile} />
          <button onClick={logOut}>LogOut</button>
        </>
      ) : (
        <div>
          <button onClick={()=>login()}>Sign In With Google 🚀</button>
          <hr />
          <button onClick={() => {}}>GUEST LOGIN</button>
        </div>
      )}
    </div>
  );
};

export default GoogleLogin;
