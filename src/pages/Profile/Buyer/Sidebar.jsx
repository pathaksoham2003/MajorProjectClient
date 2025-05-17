import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaHeart, FaShoppingCart, FaMapMarkerAlt, FaHistory, FaBoxOpen, FaKey, FaSignOutAlt, FaBars } from "react-icons/fa";

const navItems = [
  { name: "Profile", path: "/buyer", icon: <FaUser /> },
  { name: "Favorites", path: "/buyer/favorites", icon: <FaHeart /> },
  { name: "Cart", path: "/buyer/cart", icon: <FaShoppingCart /> },
  { name: "Addresses", path: "/buyer/addresses", icon: <FaMapMarkerAlt /> },
  { name: "Previous Orders", path: "/buyer/previous-orders", icon: <FaHistory /> },
  { name: "Current Orders", path: "/buyer/current-orders", icon: <FaBoxOpen /> },
  { name: "Update Password", path: "/buyer/update-password", icon: <FaKey /> },
];

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      
      {/* Sidebar */}
      <AnimatePresence>
        {(open || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="hidden lg:block fixed lg:static z-40 top-0 left-0 h-full lg:h-auto w-64 lg:w-64 bg-gradient-to-b from-primary/90 to-secondary/90 text-text p-4 border-r border-secondary shadow-xl lg:shadow-none rounded-r-3xl lg:rounded-none"
          >
            <nav className="space-y-2 mt-8 lg:mt-0">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    layout
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200
                        hover:bg-white/10 hover:shadow-md
                        ${isActive ? "bg-white/20 text-white shadow-lg scale-105" : "text-white/80"}
                      `}
                      onClick={() => setOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
              <button
                onClick={() => {
                  // logout logic here
                }}
                className="mt-4 flex items-center gap-3 w-full text-left px-4 py-2 bg-danger text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
              >
                <FaSignOutAlt className="text-lg" />
                Logout
              </button>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
