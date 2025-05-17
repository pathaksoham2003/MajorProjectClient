import { useState } from "react";
import { toast } from "react-toastify";
import useAddress from "../../../../services/useAddress";
import PropTypes from "prop-types";

export default function AddAddressModal({ isOpen, onClose, onSaved }) {
  const [formData, setFormData] = useState({
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    isDefault: false
  });

  const { addAddress } = useAddress();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addAddress(formData);
    if (result.success) {
      toast.success("Address added successfully");
      onSaved();
      onClose();
    } else {
      toast.error(result.message || "Failed to add address");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-background text-[rgba(var(--text))] p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">New Address</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {['street_address', 'city', 'state', 'postal_code', 'country'].map((field) => (
            <div key={field}>
              <label className="block text-sm mb-1 capitalize">{field.replace('_', ' ')}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-background px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
          ))}
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="mr-2 bg-background"
            />
            Set as default address
          </label>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddAddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};
