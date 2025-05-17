import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import useAuth from "../services/useAuth";
import useLocalStorage from "../utils/useLocalStorage";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userInfo/userSlice"; 

const Login = () => {
  const [owner, setOwner] = useState(false);
  const validEmail = /^[a-zA-Z0-9]+@(?:[a-z]+\.)+[A-Za-z]+$/;
  const navigate = useNavigate();
  const {setData} = useLocalStorage();
  const dispatch = useDispatch();
  const auth = useAuth({type: owner ? "owner" : "user"});

  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCred((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValidation = () => {
    if (!cred.email || !cred.password) {
      toast.warn("Fill in the credentials");
      return false;
    }
    if (!validEmail.test(cred.email)) {
      toast.warn("Entered Email Is Not Valid");
      return false;
    }
    if (cred.password.length < 8) {
      toast.warn("Short Password");
      return false;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).+/.test(cred.password)) {
      toast.warn("Password must contain a digit");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;
    const response = await auth.login(cred);
    if (response.success) {
      toast.success("Login successful!");
      console.log(response.data)
      dispatch(setUser({
        token: response.data.token,
        user: response.data.user,
        email: response.data.email,
        id: response.data.id,
        role: response.data.role,
      }));
      if (owner) {
        navigate(`/seller/`);
        return;
      }
      navigate("/buyer");
    } else {
      toast.error(response.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block w-1/2 h-screen overflow-hidden relative">
        <img
          src="https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Login"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="w-full lg:w-1/2 p-8 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl text-text font-semibold">Login</h3>
            <div className="bg-subheading/20 p-2 rounded-lg flex">
              <h2
                className={`p-1 px-2 rounded-lg mr-2 ${
                  owner ? "text-white bg-primary" : "text-text"
                }`}
                onClick={() => setOwner(true)}
              >
                Seller
              </h2>
              <h2
                className={`p-1 px-2 rounded-lg ${
                  !owner ? "text-heading bg-secondary" : "text-text"
                }`}
                onClick={() => setOwner(false)}
              >
                Buyer
              </h2>
            </div>
          </div>

          <input
            type="email"
            name="email"
            value={cred.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 mb-4 border bg-background border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            value={cred.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 mb-6 border bg-background border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <h4 className="text-text text-sm mb-4">
            If you don't have an account{" "}
            <Link to="/register" className="text-primary font-medium">
              Click Here
            </Link>
          </h4>

          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-md hover:bg-primary/80 transition duration-200"
          >
            Proceed to Login
          </button>

          <hr className="my-6 border-gray-300" />

          <h2>Sign in with google</h2>

          <button className="w-full bg-secondary text-white p-3 rounded-md mt-4 hover:bg-secondary/80 transition duration-200">
            🤵 Guest Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
