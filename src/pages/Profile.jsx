import React from 'react'
import styles from "./Profile.module.css";
const Profile = ({userData}) => {
  return (
    <div className={styles.container}>{JSON.stringify(userData)}</div>
  )
}

export default Profile