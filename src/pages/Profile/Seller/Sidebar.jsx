import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaStore, FaBox, FaHistory } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../features/userInfo/userSlice";
import { BsTicket } from "react-icons/bs";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/"); // Redirect to home after logout
  };

  const navItems = [
    { to: "", icon: <FaHome />, label: "Dashboard" },
    { to: "shop-details", icon: <FaStore />, label: "Shop Details" },
    { to: "orders", icon: <FaBox />, label: "Orders" },
    { to: "products", icon: <AiOutlineProduct />, label: "Products" },
    { to: "inventory", icon: <AiOutlineProduct />, label: "Inventory" },
    { to: "coupons", icon: <BsTicket />, label: "Coupons" },
    { to: "previous-orders", icon: <FaHistory />, label: "Previous Orders" },
    { to: "#", icon: <FaHistory />, label: "Logout", onClick: handleLogout },
  ];

  return (
    <motion.div
      className={`bg-primary text-white min-h-screen p-4 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      exit={{ x: -200 }}
    >
      <div className="space-y-6">
        <div className="text-xl font-bold">
          <button
            className="text-white"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>

        <div>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary ${
                  isActive ? "bg-secondary" : ""
                }`
              }
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
              }}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
