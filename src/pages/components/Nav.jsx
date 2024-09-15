import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartSelector } from "../../features/cartProducts/cartProductsSlice";
import { selectFavorite } from "../../features/favoriteProducts/favoriteProductsSlice";

const Nav = () => {
  const [stateTheme, setTheme] = useState("day");
  const [allPro, setPro] = useState(false);
  const CartItems = useSelector(cartSelector);
  const Favorite = useSelector(selectFavorite);
  const changeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    document.body.classList = [theme];
    if (stateTheme === "night") {
      setTheme("day");
    } else {
      setTheme("night");
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "night") {
      changeTheme("night");
      setTheme("night");
    } else {
      changeTheme("day");
      setTheme("day");
    }
  }, []);

  return (
    <header className="w-full">
      <div className="w-full z-50 flex h-[64px] justify-center bg-nav">
        <div className="w-full max-w-[1440px] flex flex-1 items-center justify-between bg-navbar">
          <Link to="/" className="text-3xl text-heading font-bold">
            Somazon
          </Link>
          <div className="hidden lg:flex text-black rounded-l-xl">
            <div className="relative bg-primary flex rounded-xl">
              <Link
                to="/products"
                className="text-white rounded-l-md font-semibold p-2"
              >
                All Products
              </Link>
              <div
                className="py-2 bg-blue-500"
                onClick={() => setPro((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {allPro && (
                <div
                  className={`flex absolute bg-white z-50 -bottom-20 left-0`}
                >
                  <h2>Hellooo</h2>
                </div>
              )}
            </div>
            <input
              className=" w-[500px] bg-background border-none outline-none px-4 p-2"
              placeholder="Search for the product you need..."
            />
            <div className=" h-10 p-2 rounded-r-xl bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>
          <div className="p-3 flex items-center">
            <Link to="/favorite" className="h-full relative mx-4">
              <h2 className="absolute -top-1 -left-2 bg-red-600 h-6 w-6 rounded-full font-bold text-white text-center">
                {Favorite.length}
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={stateTheme == "day" ? "black" : "white"}
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </Link>
            <Link to="/cart" className="h-full relative mx-4">
              <h2 className="absolute -top-2 left-0 bg-red-600 h-6 w-6 rounded-full font-bold text-white text-center">
                {CartItems.length}
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke={stateTheme == "day" ? "black" : "white"}
                className="size-8 mx-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Link>
            {stateTheme == "day" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                className="size-8 p-1"
                onClick={() => changeTheme("night")}
              >
                <path
                  fillRule="evenodd"
                  d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-8"
                onClick={() => changeTheme("day")}
              >
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className="bg-nav w-full p-2 border-y-2 lg:hidden">
        <div className="relative bg-background w-full flex items-center rounded-xl ">
          <Link
            to="/products"
            className="text-white bg-primary rounded-l-md font-semibold p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>
          <div
            className="py-2 bg-blue-500"
            onClick={() => setPro((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <input
            className="flex-1 bg-background border-none outline-none px-4 p-2"
            placeholder="Search for the product you need..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          {allPro && (
            <div className={`flex absolute bg-white z-50 -bottom-20 left-0`}>
              <h2>Hellooo</h2>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
