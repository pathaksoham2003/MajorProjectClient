import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import useInventory from "../../services/useInventory";
import useCart from "../../services/useCart";
import { FiMapPin, FiCheck, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../features/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = ({ productDetails }) => {
  const [pinCode, setPinCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { getInventoryByPinCode } = useInventory();
  const { addToCart } = useCart();
  const dispatch = useDispatch();

  const checkAvailability = async () => {
    if (!pinCode || pinCode.length !== 6) {
      setAvailabilityStatus({ available: false, message: "Please enter a valid 6-digit pin code" });
      return;
    }

    setIsChecking(true);
    try {
      const result = await getInventoryByPinCode(pinCode);
      if (result.success) {
        const isAvailable = result.data.some(inv => 
          inv.product_id === productDetails.id && 
          inv.status === 'active' && 
          inv.quantity > 0
        );
        setAvailabilityStatus({
          available: isAvailable,
          message: isAvailable 
            ? "Product is available for delivery at this location" 
            : "Product is not available for delivery at this location"
        });
      } else {
        setAvailabilityStatus({ 
          available: false, 
          message: "Error checking availability. Please try again." 
        });
      }
    } catch (error) {
      setAvailabilityStatus({ 
        available: false, 
        message: "Error checking availability. Please try again." 
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleAddToCart = async () => {
    if (!availabilityStatus?.available) return;
    
    setIsAddingToCart(true);
    try {
      const response = await addToCart(productDetails.id, 1);
      if (response.success) {
        dispatch(addCartItem(response.data));
        toast.success("Added to cart!");
      }
    } catch (error) {
      toast.error("Error adding to cart.");
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="sm:w-1/2 h-fit overflow-y-auto pr-2 scrollbar-hide">
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-bold mb-2 text-text">{productDetails?.name}</h1>
        <p className="text-lg text-subheading">{productDetails?.brand}</p>
        <p className="text-lg mb-2 text-subheading">{productDetails?.category}</p>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-semibold text-text">₹ {productDetails?.price}</span>
          {productDetails?.discount > 0 && (
            <span className="text-sm text-green-500">({productDetails?.discount}% off)</span>
          )}
        </div>
        <p className="mb-4 text-text">{productDetails?.description}</p>
        <div className="text-sm text-subheading">
          <p>Gender: {productDetails?.gender}</p>
          <p>
            Rating: {productDetails?.rating} ({productDetails?.rate} reviews)
          </p>
          <p>Discount: {productDetails?.discount}%</p>
        </div>

        {/* Pin Code Availability Check */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <FiMapPin className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-text">Check Delivery Availability</h3>
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={pinCode}
              onChange={(e) => {
                setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                setAvailabilityStatus(null);
              }}
              placeholder="Enter 6-digit pin code"
              className="flex-1 p-2 bg-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={6}
            />
            <button
              onClick={checkAvailability}
              disabled={isChecking || !pinCode}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center"
            >
              {isChecking ? "Checking..." : "Check"}
            </button>
          </div>

          {availabilityStatus && (
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              availabilityStatus.available 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {availabilityStatus.available ? (
                <FiCheck className="w-5 h-5" />
              ) : (
                <FiX className="w-5 h-5" />
              )}
              <p>{availabilityStatus.message}</p>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-5">
          <button
            onClick={handleAddToCart}
            disabled={!availabilityStatus?.available || isAddingToCart}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {isAddingToCart 
              ? "Adding..." 
              : availabilityStatus?.available 
                ? "Add to Cart" 
                : "Not Available for Delivery"}
          </button>
          <button 
            className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90"
            onClick={() => window.location.href = '/cart'}
          >
            View Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

ProductDetails.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    rating: PropTypes.number,
    rate: PropTypes.number,
  }).isRequired,
};

export default ProductDetails;
