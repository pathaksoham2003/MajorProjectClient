import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRouter = ({user , children}) => {
    return (
    <div>
        {
            user ? children : <Navigate to ="/welcome"/>
         }
    </div>
  )
}

export default ProtectedRouter