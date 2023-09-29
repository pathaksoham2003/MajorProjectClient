import React, { useState } from 'react'
import styles from "./AllProducts.module.css";
import Card from '../allFeatureComponents/Card'
const AllProducts = () => {
  return (
    <div className={styles.container}>
      {data.map((data)=> (
      <Card data={data}/>
      ))}
    </div>
  )
}

export default AllProducts