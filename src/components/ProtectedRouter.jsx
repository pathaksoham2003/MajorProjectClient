import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRouter = ({user , children}) => {
  
    return (
    <div>
        {
            user ? children : <Navigate to ="/login"/>
         }
    </div>
  )
}

export default ProtectedRouter