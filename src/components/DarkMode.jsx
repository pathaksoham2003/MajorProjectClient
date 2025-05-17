import React from "react";
import "./DarkMode.css";
import Moon from "./Moon.svg?react";
import Sun from "./Sun.svg?react";
import { useDispatch } from "react-redux";
import { setSelectedTheme } from "../../features/userInfo/userSlice";
const DarkMode = () => {
  const dispatch = useDispatch();
  const setDarkMode = () => {
    localStorage.setItem("theme", "dark");
    document.body.classList = ["dark"];
  };
  const setLightMode = () => {
    localStorage.setItem("theme", "light");
    document.body.classList = ["light"];
  };
  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };
  const selectedTheme = localStorage.getItem("theme");
  if (selectedTheme === "dark") {
    setDarkMode();
  }
  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme === "dark"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
