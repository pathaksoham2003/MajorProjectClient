import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToFavorite,
  removeFavorite,
  selectFavorite,
} from "../favoriteProducts/favoriteProductsSlice";
import {
  addToCart,
  cartSelector,
  removeFromCart,
} from "../cartProducts/cartProductsSlice";
import { toast } from "react-toastify";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const favoritePro = useSelector(selectFavorite);
  const cartItems = useSelector(cartSelector);
  const [favorite, setFavorite] = useState(false);
  const [cart, setCart] = useState(false);

  const [stars, setStars] = useState([]);

  useEffect(() => {
    const filled = parseInt(data.rating);
    const unfilled = parseInt(5 - filled);

    const starsArray = [
      ...Array(filled).fill(
        <svg
          className="w-4 h-4 ms-1 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ),
      ...Array(unfilled).fill(
        <svg
          className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      )
    ];

    setStars(starsArray);
  }, [data.rating]);


  const handleAddToFavorite = (e) => {
    e.preventDefault();
    if (favorite) {
      dispatch(removeFavorite(data));
      toast.warn("Product removed from favorite list", {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        ),
      });
    } else {
      dispatch(addToFavorite(data));
      toast.success("Product added to the favorite list", {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="size-6"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        ),
      });
    }
    setFavorite(!favorite);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (cart) {
      dispatch(removeFromCart(data));
      toast.error("Product removed from cart", {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="red"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        ),
      });
    } else {
      dispatch(addToCart(data));
      toast.success("Product added to the cart", {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="green"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
              clip-rule="evenodd"
            />
          </svg>
        ),
      });
    }
    setCart(!cart);
  };

  useEffect(() => {
    favoritePro.map((item) => {
      if (item.product_id == data.product_id) {
        setFavorite(true);
      }
    });
    cartItems.map((item) => {
      if (item.item.product_id == data.product_id) {
        setCart(true);
      }
    });
  }, []);

  return (
    <Link
      to={`/product/${data.product_id}`}
      className="relative h-auto flex flex-col bg-card border-2 p-1 pb-4 border-card rounded-2xl m-2"
    >
      <div className="absolute top-3 left-3 bg-accent font-bold text-gray-900 z-20 rounded-lg px-2">
        NEW
      </div>
      <div
        className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 shadow-lg p-2 items-center rounded-xl z-20"
        onClick={handleAddToFavorite}
      >
        {favorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="size-6"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        )}
      </div>

      <div className="w-full bg-white rounded-2xl overflow-hidden aspect-square z-10">
        <img
          src={data.mainimage}
          className="w-full object-cover z-10 rounded-[10px]"
        />
      </div>
      <div className="px-3">
        <div className="h-[75px] overflow-hidden pt-3">
          <h2 className="text-heading text-xl">{data.name}</h2>
        </div>
        <div class="flex items-center mb-5">
          
        {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-heading text-sm line-through">
              <span>&#8377; </span>
              {data.price}
            </h2>
            <h2 className="text-heading font-semibold text-xl">
              <span>&#8377; </span>
              {data.price}
            </h2>
          </div>

          <div
            onClick={handleAddToCart}
            className={`border-[3px] border-success ${
              cart ? "bg-success shadow-2xl" : ""
            } p-1 px-2 flex rounded-lg overflow-hidden cursor-pointer`}
          >
            <h2
              className={`flex font-bold ${
                cart ? "text-heading" : "text-success"
              } text-lg`}
            >
              Add to{" "}
              {cart ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              )}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
