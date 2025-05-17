import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import useCoupon from "../../../../../services/useCoupon";
import CouponModal from "./CouponModal";
import { useSelector } from "react-redux";
import { selectShop } from "../../../../../features/shopSlice";

const ManageCoupon = ({ productId }) => {
  const { getCouponsByProductId, createCoupon, updateCoupon, deleteCoupon } = useCoupon();
  const [coupons, setCoupons] = useState([]);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [couponData, setCouponData] = useState({
    code: "",
    discount: "",
    expiryDate: "",
    isPercentage: true,
    minOrderAmount: "",
  });

  const {shop} = useSelector(selectShop)

  
  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    const couponsResponse = await getCouponsByProductId(shop.id);
    if (couponsResponse.success) {
      console.log(couponsResponse)
        setCoupons(couponsResponse);
    }
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...couponData,
      productId,
      shopId: 10, // Using the provided shopId
    };

    if (editingCoupon) {
      const response = await updateCoupon(editingCoupon._id, data);
      if (response.success) {
        setCoupons(coupons.map((c) => (c._id === editingCoupon._id ? response.data : c)));
        toast.success("Coupon updated successfully");
      } else {
        toast.error("Failed to update coupon");
      }
    } else {
      const response = await createCoupon(data);
      if (response.success) {
        setCoupons([...coupons, response.data]);
        toast.success("Coupon created successfully");
      } else {
        toast.error("Failed to create coupon");
      }
    }
    setIsCouponModalOpen(false);
    setEditingCoupon(null);
    setCouponData({
      code: "",
      discount: "",
      expiryDate: "",
      isPercentage: true,
      minOrderAmount: "",
    });
  };

  const handleDeleteCoupon = async (couponId) => {
    const response = await deleteCoupon(couponId);
    if (response.success) {
      setCoupons(coupons.filter((c) => c._id !== couponId));
      toast.success("Coupon deleted successfully");
    } else {
      toast.error("Failed to delete coupon");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background/80 rounded-lg shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-text">Coupons</h2>
        <button
          onClick={() => setIsCouponModalOpen(true)}
          className="px-4 py-2 bg-secondary text-background rounded-md hover:bg-secondary/90 transition-colors"
        >
          Add Coupon
        </button>
      </div>
      <div className="grid gap-4">
        {coupons.map((coupon) => (
          <motion.div
            key={coupon._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-text">{coupon.code}</p>
              <p className="text-text/80">
                {coupon.isPercentage ? `${coupon.discount}% off` : `$${coupon.discount} off`}
              </p>
              <p className="text-text/60">
                Min. Order: ${coupon.minOrderAmount}
              </p>
              <p className="text-text/60">
                Valid until: {new Date(coupon.expiryDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingCoupon(coupon);
                  setCouponData({
                    code: coupon.code,
                    discount: coupon.discount,
                    expiryDate: coupon.expiryDate,
                    isPercentage: coupon.isPercentage,
                    minOrderAmount: coupon.minOrderAmount,
                  });
                  setIsCouponModalOpen(true);
                }}
                className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCoupon(coupon._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Coupon Modal */}
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => {
          setIsCouponModalOpen(false);
          setEditingCoupon(null);
          setCouponData({
            code: "",
            discount: "",
            expiryDate: "",
            isPercentage: true,
            minOrderAmount: "",
          });
        }}
        couponData={couponData}
        setCouponData={setCouponData}
        onSubmit={handleCouponSubmit}
        isEditing={!!editingCoupon}
      />
    </motion.div>
  );
};

ManageCoupon.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ManageCoupon; 