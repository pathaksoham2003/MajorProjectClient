import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userInfo/userSlice";
const ProtectedRouter = ({ children }) => {
  const user = useSelector(selectUser);

  return (
    <div>{user.user_id.length === 0 ? <Navigate to="/login" /> : children}</div>
  );
};

export default ProtectedRouter;
