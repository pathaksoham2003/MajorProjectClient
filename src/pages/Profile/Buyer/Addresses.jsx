import { useState } from "react";
import { motion } from "framer-motion";

export default function Addresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
  ]);
  const [defaultId, setDefaultId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.line1 || !newAddress.city || !newAddress.state || !newAddress.zip) return;

    const id = Date.now();
    setAddresses([...addresses, { ...newAddress, id }]);
    setNewAddress({ label: "", line1: "", line2: "", city: "", state: "", zip: "" });
    setShowForm(false);
  };

  return (
    <motion.div
      className="p-6 rounded-lg bg-[rgba(var(--background))] text-[rgba(var(--text))] shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-4 text-[rgba(var(--subheading))]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Your Addresses
      </motion.h2>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-4 rounded border ${
              addr.id === defaultId
                ? "border-[rgba(var(--primary))] bg-[rgba(var(--primary)/0.05)]"
                : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-[rgba(var(--text))]">{addr.label}</p>
                <p>{addr.line1}</p>
                {addr.line2 && <p>{addr.line2}</p>}
                <p>
                  {addr.city}, {addr.state} {addr.zip}
                </p>
              </div>
              <div>
                {addr.id !== defaultId && (
                  <button
                    onClick={() => setDefaultId(addr.id)}
                    className="text-sm px-3 py-1 rounded bg-[rgba(var(--secondary))] text-white hover:bg-[rgba(var(--secondary)/0.9)]"
                  >
                    Set Default
                  </button>
                )}
                {addr.id === defaultId && (
                  <span className="text-sm text-[rgba(var(--success))] font-medium">Default</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Button */}
      <button
        onClick={() => setShowForm(true)}
        className="mt-6 px-4 py-2 bg-[rgba(var(--primary))] text-white rounded hover:bg-[rgba(var(--primary)/0.9)]"
      >
        + Add New Address
      </button>

      {/* Address Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-[rgba(var(--background))] text-[rgba(var(--text))] p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-[rgba(var(--subheading))]">New Address</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAddress();
              }}
              className="space-y-3"
            >
              {[
                ["label", "Label (e.g., Home, Work)"],
                ["line1", "Address Line 1"],
                ["line2", "Address Line 2 (optional)"],
                ["city", "City"],
                ["state", "State"],
                ["zip", "ZIP Code"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="block text-sm mb-1">{label}</label>
                  <input
                    type="text"
                    value={newAddress[key]}
                    onChange={(e) =>
                      setNewAddress((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-[rgba(var(--background))] text-[rgba(var(--text))] focus:outline-none focus:ring-2 focus:ring-[rgba(var(--primary))]"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-[rgba(var(--secondary))] text-white rounded hover:bg-[rgba(var(--secondary)/0.9)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[rgba(var(--success))] text-white rounded hover:bg-[rgba(var(--success)/0.9)]"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
