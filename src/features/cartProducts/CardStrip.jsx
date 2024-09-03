import React from "react";
import styles from "../allFeatureComponents/CardStrip.module.css";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "./cartProductsSlice";
const CardStrip = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className="rounded-lg border border-gray-200 bg-background p-4 shadow-sm md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <div className="h-32 w-32 bg-white overflow-hidden rounded-xl">
            <img src={data.item.mainimage} />
          </div>
        </a>

        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => dispatch(decrementQuantity(data.item.product_id))}
              id="decrement-button"
              data-input-counter-decrement="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-card  focus:outline-none  "
            >
              <svg
                className="h-2.5 w-2.5 text-heading"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="counter-input"
              data-input-counter
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-heading outline-none focus:ring-0"
              placeholder=""
              value={data.quantity}
              required
            />
            <button
              type="button"
              onClick={() => dispatch(incrementQuantity(data.item.product_id))}
              id="increment-button"
              data-input-counter-increment="counter-input"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-card  focus:outline-none  "
            >
              <svg
                className="h-2.5 w-2.5 text-heading"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-heading">
              ₹ {data.item.price}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <a
            href="#"
            className="text-base font-medium text-heading hover:underline"
          >
            {data.item.name}
          </a>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-heading hover:underline "
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              Add to Favorites
            </button>

            <button
              onClick={() => dispatch(removeFromCart(data.item))}
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className={styles.box}>
    //     <div className={styles.imageContainer}>
    //         <img src={data.item.mainimage}/></div>
    //     <div className={styles.information}>
    //         <h3>{data.item.name}</h3>
    //         <h3>{data.item.price}</h3>
    //         <div className={styles.increDecre}><span onClick={()=>dispatch(decrementQuantity(data.item.product_id))}>-</span><h4>{data.quantity}</h4><span  className={styles.left} onClick={()=> dispatch(incrementQuantity(data.item.product_id))}>+</span></div>
    //         <button onClick={()=> dispatch(removeFromCart(data.item))}>Remove Item</button>
    //         <button>Buy Now</button>
    //     </div>
    // </div>
  );
};

export default CardStrip;
