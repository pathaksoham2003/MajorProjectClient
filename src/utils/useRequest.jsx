import axios from "axios";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import {toast} from "react-toastify";
import useAuth from "../services/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/userInfo/userSlice";

const useRequest = () => {
  const token = useSelector(state=>state.user.token)
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const Request = axios.create({
    baseURL:
      import.meta.env.VITE_SERVER_URL || "http://127.0.0.1:8000/",
  });

  Request.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = `Bearer ${token}`;

      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  Request.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "Something went wrong";
        console.log("Status",error)
        if (status === 403) {
          dispatch(logoutUser())
          navigation("/login");
        }
  
        return Promise.reject({
          success: false,
          status,
          message,
        });
      }
  
      return Promise.reject({
        success: false,
        status: 500,
        message: error.message || "Server Error",
      });
    }
  );
  
  return {
    Request,
  };
};

export default useRequest;
