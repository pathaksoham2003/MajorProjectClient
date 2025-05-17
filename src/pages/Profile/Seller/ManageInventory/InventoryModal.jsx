import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInventory from "../../../../services/useInventory";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

export default function InventoryModal({ inventory, onClose, onSuccess }) {
  const { updateInventory } = useInventory();
  const [formData, setFormData] = useState({
    quantity: "",
    minimum_threshold: "",
    delivery_pin_codes: [],
    status: "active"
  });
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (inventory) {
      setFormData({
        quantity: inventory.quantity,
        minimum_threshold: inventory.minimum_threshold,
        delivery_pin_codes: inventory.delivery_pin_codes || [],
        status: inventory.status
      });
    }
  }, [inventory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      const result = await updateInventory(inventory.id, formData);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.message || "Failed to update inventory");
      }
    } catch (err) {
      setError("An error occurred while updating inventory");
    } finally {
      setLoading(false);
    }
  };

  console.log(inventory)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-text">Edit Inventory</h3>
          <button
            onClick={onClose}
            className="text-subheading hover:text-text transition-colors duration-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Preview Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img
                src={inventory.Product.imageUrls[0] || "https://via.placeholder.com/400"}
                alt={inventory.Product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-text">{inventory.Product.name}</h4>
              <p className="text-subheading">₹{inventory.Product.price}</p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full p-2.5 bg-secondary rounded-lg text-text border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
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
                className="w-full p-2.5 bg-secondary rounded-lg text-text border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
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
                className="w-full p-2.5 bg-secondary rounded-lg text-text border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
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
                  className="flex-1 p-2.5 bg-secondary rounded-lg text-text border border-transparent focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={handleAddPinCode}
                  className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 flex items-center"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.delivery_pin_codes.map((pin, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1.5 bg-primary bg-opacity-10 text-primary rounded-full"
                  >
                    <span>{pin}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePinCode(pin)}
                      className="text-primary hover:text-danger transition-colors duration-200"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-danger text-sm">{error}</p>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-text hover:bg-secondary rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-all duration-200"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

InventoryModal.propTypes = {
  inventory: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    minimum_threshold: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    delivery_pin_codes: PropTypes.arrayOf(PropTypes.string).isRequired,
    Product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image_url: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};