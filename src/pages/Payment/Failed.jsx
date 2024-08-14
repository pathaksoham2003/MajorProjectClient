import React from 'react'
import { toast } from 'react-toastify';

const Failed = () => {
  const notifFail = () => toast("Payment Failed");
  notifFail()
  return (
    <div className='mt-20 text-6xl'>Payment Failed</div>
  )
}

export default Failed