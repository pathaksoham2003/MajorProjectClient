import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

const Success = () => {
  const notifSuccess = () => toast("Payment Successful");
  notifSuccess()
  return (
    <div className='mt-20 text-6xl'>Payment Success</div>
  )
}

export default Success