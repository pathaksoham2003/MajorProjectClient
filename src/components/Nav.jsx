import {useEffect, useState, useRef} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";

import { selectCartItems } from "../features/cartSlice";
import { selectFavorites } from "../features/favoriteSlice";

import {PiHeartBold, PiShoppingCartBold} from "react-icons/pi";
import {LuSun, LuMoon} from "react-icons/lu";
import {HiOutlineMenuAlt3, HiOutlineX} from "react-icons/hi";
import {selectUser} from "../features/userInfo/userSlice";

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Stationary",
  "Toys",
  "Other"
];

const Nav = () => {
  const [stateTheme, setTheme] = useState("day");
  const [showCategories, setShowCategories] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const cartItems = useSelector(selectCartItems);
  const favoriteItems = useSelector(selectFavorites);
  const user = useSelector(selectUser);

  const categoriesRef = useRef(null);

  const changeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    document.body.classList = [theme];
    setTheme(theme);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "day";
    changeTheme(theme);
  }, []);

  // Close the categories modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`w-full fixed z-50 transition-all duration-300 ${
        isHidden ? "-translate-y-[60px]" : "translate-y-0"
      }`}
    >
      <div className="w-full flex h-[60px] justify-center bg-background shadow-md shadow-black/20">
        <div className="w-full max-w-[1440px] flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="lg:hidden mr-2">
              <HiOutlineMenuAlt3
                size={30}
                className="text-text cursor-pointer"
                onClick={() => setDrawerOpen(true)}
              />
            </div>

            <Link to="/" className="text-2xl text-text font-bold">
              Somazon
            </Link>
          </div>

          <div className="hidden lg:flex items-center flex-1 mx-4">
            <div
              className="relative"
              ref={categoriesRef}
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <Link
                to="/products"
                className="bg-primary text-white font-semibold p-2 rounded-md flex items-center"
              >
                All Products
                <svg className="ml-2 w-5 h-5" fill="white" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </Link>

              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 10}}
                    className="absolute top-11 left-0 bg-white rounded-lg shadow-lg p-4 grid grid-cols-2 gap-4 z-50 w-72"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/products?category=${category.toLowerCase()}`}
                        className="text-gray-700 hover:text-primary font-medium"
                      >
                        {category}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="ml-4 flex-1">
              <input
                type="text"
                className="w-full px-4 py-2 bg-background rounded-lg border border-gray-300 outline-none"
                placeholder="Search for the product you need..."
              />
            </div>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <Link to="/favorite" className="relative">
              <span className="absolute -top-2 -right-2 bg-red-600 h-5 w-5 text-xs rounded-full text-white flex items-center justify-center">
                {favoriteItems.length}
              </span>
              <PiHeartBold size={30} className="text-text" />
            </Link>

            <Link to="/cart" className="relative">
              <span className="absolute -top-2 -right-2 bg-red-600 h-5 w-5 text-xs rounded-full text-white flex items-center justify-center">
                {cartItems.length}
              </span>
              <PiShoppingCartBold size={30} className="text-text" />
            </Link>

            {stateTheme === "day" ? (
              <LuMoon
                size={28}
                className="text-text cursor-pointer"
                onClick={() => changeTheme("night")}
              />
            ) : (
              <LuSun
                size={28}
                className="text-text cursor-pointer"
                onClick={() => changeTheme("day")}
              />
            )}

            {user && user.id ? (
              <Link
                to={user.role === "buyer" ? "/buyer" : "/seller"}
                className="flex items-center gap-2"
              >
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-text font-semibold">{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="text-primary font-semibold">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{x: "-100%"}}
            animate={{x: 0}}
            exit={{x: "-100%"}}
            transition={{type: "tween"}}
            className="fixed top-0 left-0 w-72 h-full bg-background shadow-2xl z-[100] p-5"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary">Menu</h2>
              <HiOutlineX
                size={28}
                className="cursor-pointer text-text"
                onClick={() => setDrawerOpen(false)}
              />
            </div>

            {/* Theme Toggle, Favorite, Cart, and Sign In */}
            <div className="flex flex-col gap-4 mb-6">
              {/* Dark Theme Toggle */}
              {stateTheme === "day" ? (
                <LuMoon
                  size={28}
                  className="text-text cursor-pointer"
                  onClick={() => changeTheme("night")}
                />
              ) : (
                <LuSun
                  size={28}
                  className="text-text cursor-pointer"
                  onClick={() => changeTheme("day")}
                />
              )}

              {/* Favorite List */}
              <Link to="/favorite" className="relative">
                <span className="absolute -top-2 -right-2 bg-red-600 h-5 w-5 text-xs rounded-full text-white flex items-center justify-center">
                  {favoriteItems.length}
                </span>
                <PiHeartBold size={30} className="text-text" />
              </Link>

              {/* Cart Items */}
              <Link to="/cart" className="relative">
                <span className="absolute -top-2 -right-2 bg-red-600 h-5 w-5 text-xs rounded-full text-white flex items-center justify-center">
                  {cartItems.length}
                </span>
                <PiShoppingCartBold size={30} className="text-text" />
              </Link>

              {/* Sign In or Profile */}
              {user.id ? (
                <div className="flex items-center gap-2">
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-text font-semibold">{user.name}</span>
                </div>
              ) : (
                <Link to="/login" className="text-primary font-semibold">
                  Sign In
                </Link>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-4">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${category.toLowerCase()}`}
                  className="text-gray-700 text-lg hover:text-primary"
                  onClick={() => setDrawerOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 0.5}}
            exit={{opacity: 0}}
            className="fixed inset-0 bg-black z-50"
            onClick={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
