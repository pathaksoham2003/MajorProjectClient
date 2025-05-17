import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../services/useAuth";

const Register = () => {
  const dispatch = useDispatch();
  const [owner, setOwner] = useState(false);
  const {register} = useAuth({type: owner ? "owner" : "user"});

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const validEmail = /^[a-zA-Z0-9]+@(?:[a-z]+\.)+[A-Za-z]+$/;

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValidation = () => {
    const {name, email, password, confirmPassword, phoneNumber} = user;

    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      toast.warn("Please fill in all the fields");
      return false;
    }
    if (!validEmail.test(email)) {
      toast.warn("Entered Email Is Not Valid");
      return false;
    }
    if (password.length < 8) {
      toast.warn("Password is too short");
      return false;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).+/.test(password)) {
      toast.warn("Password must contain a digit");
      return false;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    const {name, email, password, phoneNumber} = user;

    const {success, data, message} = await register({
      name,
      email,
      password,
      phoneNumber,
    });

    if (success) {
      toast.success(
        data?.message || "Registration successful! Please verify your email."
      );
      // optionally redirect to login page
    } else {
      toast.error(message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Image Section */}
      <div className="hidden lg:block w-1/2 h-screen overflow-hidden relative">
        <img
          src="https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Register Image"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 p-8 flex justify-center items-center">
        <form
          className="w-full max-w-md bg-white/20 backdrop-blur-sm border border-gray-200 rounded-xl shadow-2xl p-6"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl text-text font-semibold">Register</h3>
            <div className="bg-subheading/20 p-2 rounded-lg flex">
              <h2
                className={`p-1 px-2 rounded-lg  mr-2  ${
                  owner ? "text-white bg-primary" : "text-text"
                }`}
                onClick={() => setOwner(true)}
              >
                Seller
              </h2>
              <h2
                className={`p-1 px-2 rounded-lg ${
                  !owner ? "text-heading bg-secondary" : " text-text"
                }`}
                onClick={() => setOwner(false)}
              >
                Buyer
              </h2>
            </div>
          </div>

          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 bg-background mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 bg-background mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 bg-background mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 bg-background mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 bg-background mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <h4 className="text-text text-sm mb-4">
            If you already have an account{" "}
            <Link to="/login" className="text-primary font-medium">
              Click Here
            </Link>
          </h4>

          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-md hover:bg-primary/80 transition duration-200"
          >
            Proceed to Register
          </button>
          <hr className="my-6 border-gray-300" />
          <h2>Sign in with google</h2>
          {/* <GoogleLogin /> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
