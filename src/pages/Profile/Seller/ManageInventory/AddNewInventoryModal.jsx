import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useShop from "../../../../services/useShop";
import useInventory from "../../../../services/useInventory";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

export default function AddNewInventoryModal({ onClose, onSuccess }) {
  const { getProductsAtShop } = useShop();
  const { createInventory } = useInventory();
  const shopProducts = useSelector((state) => state.shop.shopProducts);
  
  const [formData, setFormData] = useState({
    product_id: "",
    quantity: "",
    minimum_threshold: "",
    delivery_pin_codes: [],
    status: "active"
  });
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products when modal opens
    getProductsAtShop();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update selected product when product_id changes
    if (name === "product_id") {
      const productId = value;
      if (!isNaN(productId)) {
        const product = shopProducts.find(p => p.id === productId);
        setSelectedProduct(product || null);
      } else {
        setSelectedProduct(null);
      }
    }
  };

  const handleAddPinCode = () => {
    if (pinCode && !formData.delivery_pin_codes.includes(pinCode)) {
      setFormData(prev => ({
        ...prev,
        delivery_pin_codes: [...prev.delivery_pin_codes, pinCode]
      }));
      setPinCode("");
    }
  };

  const handleRemovePinCode = (pinToRemove) => {
    setFormData(prev => ({
      ...prev,
      delivery_pin_codes: prev.delivery_pin_codes.filter(pin => pin !== pinToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await createInventory(formData);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.message || "Failed to add inventory item");
      }
    } catch (err) {
      setError("An error occurred while adding inventory item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-text">Add New Inventory</h3>
          <button
            onClick={onClose}
            className="text-subheading hover:text-text transition-colors duration-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Select Product
                </label>
                <select
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 bg-secondary rounded-lg text-text border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                >
                  <option value="">Select a product</option>
                  {shopProducts && shopProducts.map((product) => (
                    <option key={product.id} onClick={()=>setSelectedProduct(product)} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full p-2 bg-secondary rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Minimum Threshold
                </label>
                <input
                  type="number"
                  name="minimum_threshold"
                  value={formData.minimum_threshold}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full p-2 bg-secondary rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter minimum threshold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 bg-secondary rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Delivery Pin Codes
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="Enter pin code"
                    className="flex-1 p-2 bg-secondary rounded-lg text-text"
                  />
                  <button
                    type="button"
                    onClick={handleAddPinCode}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 flex items-center"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.delivery_pin_codes.map((pin, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 bg-primary bg-opacity-10 text-primary rounded"
                    >
                      <span>{pin}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePinCode(pin)}
                        className="text-primary hover:text-red-500"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Product Preview */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-text mb-1">
                Product Preview
              </label>
              <div className="h-64 bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                {selectedProduct && selectedProduct.imageUrls && selectedProduct.imageUrls[0] ? (
                  <div className="w-full h-full">
                    <img
                      src={selectedProduct.imageUrls[0]}
                      alt={selectedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium text-text">{selectedProduct.name}</h4>
                      <p className="text-sm text-subheading">Price: ₹{selectedProduct.price}</p>
                      {selectedProduct.description && (
                        <p className="text-sm text-subheading mt-1 line-clamp-2">
                          {selectedProduct.description}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-subheading text-center p-4">
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p>Select a product to preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text hover:bg-secondary rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Inventory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddNewInventoryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
}; 