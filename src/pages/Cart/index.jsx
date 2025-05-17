import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  selectCartLoading,
  setCartItems,
  removeCartItem,
  updateCartItem,
  clearCart,
} from "../../features/cartSlice";
import useCart from "../../services/useCart";
import {FaTrash, FaHeart} from "react-icons/fa";
import CheckoutSummary from "./CheckoutSummary";
import VoucherInput from "./VoucherInput";
import useAddress from "../../services/useAddress";
import AddressCard from "../Profile/Buyer/Address/AddressCard";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const loading = useSelector(selectCartLoading);
  const {
    getCart,
    removeFromCart,
    updateCartItem: updateCartItemApi,
    clearCart: clearCartApi,
  } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const {getAddresses} = useAddress();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      const response = await getCart();
      if (response.success) {
        dispatch(setCartItems(response.data));
      }
    };
    const loadAddresses = async () => {
      const response = await getAddresses();
      if (response.success) {
        setAddresses(response.data);
        const defaultAddress = response.data.find(
          (address) => address.isDefault
        );
        setSelectedAddress(defaultAddress);
      }
    };
    loadCart();
    loadAddresses();
  }, []);
  console.log(selectedAddress);

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    const quantity = Number(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;
    const response = await updateCartItemApi(cartItemId, quantity);
    if (response.success) {
      dispatch(updateCartItem(response.data));
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    const response = await removeFromCart(cartItemId);
    if (response.success) {
      dispatch(removeCartItem(cartItemId));
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const response = await clearCartApi();
      if (response.success) {
        dispatch(clearCart());
        navigate("/checkout/success");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-text">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-subheading text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-stretch bg-white bg-text/10 rounded-xl shadow p-6 gap-6"
              >
                <div className="w-28 h-28 rounded-lg bg-secondary overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.Product.imageUrls[0]}
                    alt={item.Product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-semibold text-text text-lg mb-2">
                      {item.Product.name}
                    </h3>
                    <div className="flex items-center gap-4 text-subheading text-base mb-2">
                      <button className="flex items-center gap-1 hover:text-primary">
                        <FaHeart className="inline" /> Add to Favorites
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="inline" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, Number(item.quantity) - 1)
                      }
                      className="px-2 py-1 rounded bg-primary text-white hover:bg-primary/70 duration-200  transition-colors"
                    >
                      -
                    </button>
                    <span className="text-text font-medium w-6 text-center">
                      {Number(item.quantity)}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, Number(item.quantity) + 1)
                      }
                      className="px-2 py-1 rounded bg-primary text-white hover:bg-primary/70 duration-200  transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-text font-semibold text-lg mt-2">
                    ₹{" "}
                    {item.Product.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
            ))}
            {/* People also bought placeholder */}
            <div className="mt-10 hidden lg:block">
              <h2 className="text-2xl font-semibold mb-4 text-text">
                People also bought
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-text/10 text-text rounded-lg h-40 flex items-center justify-center"
                  >
                    Product {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Checkout Summary and Voucher Input */}
          <div className="flex flex-col gap-6">
            <CheckoutSummary
              cartTotal={cartTotal}
              checkoutLoading={checkoutLoading}
              onCheckout={handleCheckout}
            />
            <div className="flex text-text">
              <div className="flex flex-col gap-2 border-2 border-secondary rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">Shipping Address</h3>
                  <button className="text-primary">Change</button>
                </div>
                <p>{selectedAddress?.street_address},{selectedAddress?.city},{selectedAddress?.state},{selectedAddress?.country}</p>

              </div>
            </div>
            <VoucherInput />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
