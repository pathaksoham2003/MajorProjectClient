import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const CouponModal = ({ isOpen, onClose, couponData, setCouponData, onSubmit, isEditing }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate discount based on isPercentage
    if (couponData.isPercentage) {
      const discount = parseFloat(couponData.discount);
      if (discount > 80) {
        toast.error("Percentage discount cannot exceed 80%");
        return;
      }
      if (discount < 0 || discount > 100) {
        toast.error("Percentage discount must be between 0 and 100");
        return;
      }
    } else {
      const discount = parseFloat(couponData.discount);
      if (discount <= 0) {
        toast.error("Discount amount must be greater than 0");
        return;
      }
    }

    // Validate minimum order amount
    if (parseFloat(couponData.minOrderAmount) <= 0) {
      toast.error("Minimum order amount must be greater than 0");
      return;
    }

    onSubmit(e);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background rounded-lg p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-bold text-text mb-4">
            {isEditing ? "Edit Coupon" : "Add New Coupon"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-text/80 mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={couponData.code}
                  onChange={(e) => setCouponData({ ...couponData, code: e.target.value })}
                  className="w-full p-2 border rounded-md bg-background/50 text-text"
                  required
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id="isPercentage"
                  checked={couponData.isPercentage}
                  onChange={(e) => setCouponData({ ...couponData, isPercentage: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="isPercentage" className="text-text/80">
                  Discount in Percentage
                </label>
              </div>

              <div>
                <label className="block text-text/80 mb-1">
                  {couponData.isPercentage ? "Discount (%)" : "Discount Amount"}
                </label>
                <input
                  type="number"
                  value={couponData.discount}
                  onChange={(e) => setCouponData({ ...couponData, discount: e.target.value })}
                  className="w-full p-2 border rounded-md bg-background/50 text-text"
                  min={couponData.isPercentage ? "0" : "0"}
                  max={couponData.isPercentage ? "80" : undefined}
                  step={couponData.isPercentage ? "1" : "0.01"}
                  required
                />
                {couponData.isPercentage && (
                  <p className="text-sm text-text/60 mt-1">
                    Maximum discount allowed: 80%
                  </p>
                )}
              </div>

              <div>
                <label className="block text-text/80 mb-1">Minimum Order Amount</label>
                <input
                  type="number"
                  value={couponData.minOrderAmount}
                  onChange={(e) => setCouponData({ ...couponData, minOrderAmount: e.target.value })}
                  className="w-full p-2 border rounded-md bg-background/50 text-text"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-text/80 mb-1">Valid Until</label>
                <input
                  type="date"
                  value={couponData.expiryDate}
                  onChange={(e) => setCouponData({ ...couponData, expiryDate: e.target.value })}
                  className="w-full p-2 border rounded-md bg-background/50 text-text"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-text/80 hover:text-text"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-background rounded-md hover:bg-secondary/90 transition-colors"
              >
                {isEditing ? "Update Coupon" : "Add Coupon"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

CouponModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  couponData: PropTypes.shape({
    code: PropTypes.string.isRequired,
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    expiryDate: PropTypes.string.isRequired,
    isPercentage: PropTypes.bool.isRequired,
    minOrderAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  setCouponData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default CouponModal; 