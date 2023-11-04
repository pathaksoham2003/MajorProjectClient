import React from "react";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorite } from "../features/favoriteProducts/favoriteProductsSlice";
import { clearUser, selectUser } from "../features/userInfo/userSlice";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const userData = useSelector(selectUser);
  const favoriteItems = useSelector(selectFavorite);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(clearUser());
    localStorage.clear();
    navigate("/")
  };

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
        <h1>Favorite Products </h1>
      </div>
    </div>
  );
};

export default Profile;
