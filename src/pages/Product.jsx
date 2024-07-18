import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
    const {id} = useParams(); 
  return (
    <div className='bg-red-600'>Product{id}</div>
  )
}

export default Product