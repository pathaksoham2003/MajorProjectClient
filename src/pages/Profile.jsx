import React from "react";
import styles from "./Profile.module.css";
const Profile = ({ userData, logOut }) => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <div>
            <img src={userData.picture} />
          </div>
        </div>
        <div>
          <h1>{userData.name}</h1>
          <h3>{userData.email}</h3>
          <h3>{userData.user_id}</h3>
        </div>
        <div>
          <button onClick={logOut}>LogOut</button>
        </div>
      </div>
      <div>
        <h1>OTHER ORDER , FAVORITE </h1>
      </div>
    </div>
  );
};

export default Profile;
