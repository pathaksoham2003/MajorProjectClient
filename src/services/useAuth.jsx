import { useEffect, useState } from "react";
import useRequest from "../utils/useRequest";
import { owner, user } from "../utils/api";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { logoutUser } from "../features/userInfo/userSlice";

const useAuth = ({ type }) => {
  const { Request } = useRequest();
  const navigation = useNavigate();
  const [routes, setRoutes] = useState(owner);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "user") {
      setRoutes(user);
    } else {
      setRoutes(owner);
    }
  }, [type]);

  const register = async (data) => {
    try {
      const response = await Request.post(routes.register, data);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await Request.get(`${routes.verifyEmail}?token=${token}`);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await Request.post(routes.login, credentials);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const googleLogin = async (data) => {
    try {
      const response = await Request.post(routes.googleAuth, data);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const getDetails = async () => {
    try {
      const response = await Request.get(routes.details);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  return {
    register,
    verifyEmail,
    login,
    googleLogin,
    getDetails,
  };
};

export default useAuth;
