import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import AddressCard from "./AddressCard";
import AddAddressModal from "./AddAddressModal";
import EditAddressModal from "./EditAddressModal";
import useAddress from "../../../../services/useAddress";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [defaultId, setDefaultId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const {getAddresses} = useAddress();

  const fetchAddress = async () => {
    const data = await getAddresses();
    if (data.success) {
      setAddresses(data.data);
      const defaultAddr = data.data.find((addr) => addr.isDefault);
      if (defaultAddr) setDefaultId(defaultAddr.id);
    }
  };

  const handleSetDefault = async (id) => {
    const filteredAddresses = addresses.map((addr) => {
      if (addr.id === id) {
        return {...addr, isDefault: true};
      }
      return {...addr, isDefault: false};
    });
    setAddresses(filteredAddresses);
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <motion.div
      className="p-6 rounded-lg bg-background text-text shadow"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.4}}
    >
      <motion.h2 className="text-2xl font-bold mb-4 text-text">
        Your Addresses
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            address={addr}
            isDefault={addr.id === defaultId}
            onSetDefault={handleSetDefault}
            onEdit={() => setEditData(addr)}
          />
        ))}
      </div>

      <button
        onClick={() => setShowAddForm(true)}
        className="mt-6 px-4 py-2 bg-primary duration-200 transition-colors text-white rounded hover:bg-primary/90"
      >
        + Add New Address
      </button>

      {showAddForm && (
        <AddAddressModal
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSaved={fetchAddress}
        />
      )}

      {editData && (
        <EditAddressModal
          isOpen={!!editData}
          onClose={() => setEditData(null)}
          address={editData}
          onSaved={fetchAddress}
        />
      )}
    </motion.div>
  );
}
