import { useEffect, useState } from "react";
import InventoryModal from "./InventoryModal";
import AddNewInventoryModal from "./AddNewInventoryModal";
import useInventory from "../../../../services/useInventory";
import { FiSearch, FiPlus, FiEdit2, FiAlertCircle } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";

export default function ManageInventory() {
  const { getAllInventory } = useInventory();
  const [inventoryList, setInventoryList] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const result = await getAllInventory();
      if (result.success) {
        setInventoryList(result.data);
      } else {
        setError(result.message || "Failed to fetch inventory");
      }
    } catch (error) {
      setError("An error occurred while fetching inventory");
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const getStockStatus = (quantity, minimum_threshold) => {
    if (quantity <= 0) return "text-red-500";
    if (quantity <= minimum_threshold) return "text-yellow-500";
    return "text-green-500";
  };

  const filteredInventory = inventoryList.filter(inv => 
    inv.Product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.delivery_pin_codes.some(pin => pin.includes(searchQuery))
  );

  if (loading) {
    return (
      <div className="p-4 bg-background min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-background min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <FiAlertCircle className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">Error Loading Inventory</p>
          <p>{error}</p>
          <button 
            onClick={fetchInventory}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-text">Inventory Management</h2>
            <p className="text-subheading mt-1">Manage your product inventory and delivery locations</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name or pin code..."
                className="pl-10 pr-4 py-2 bg-secondary rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <FiSearch className="w-5 h-5 text-subheading absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 flex items-center transition-opacity duration-200"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Add New Item
            </button>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredInventory.map((inv) => (
            <div
              key={inv.id}
              className="bg-secondary rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={inv.Product.imageUrls[0]}
                  alt={inv.Product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-text mb-2">{inv.Product.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-subheading text-sm">Stock:</span>
                    <span className={`font-medium ${getStockStatus(inv.quantity, inv.minimum_threshold)}`}>
                      {inv.quantity} units
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-subheading text-sm">Price:</span>
                    <span className="text-text">₹{inv.Product.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-subheading text-sm">Min. Threshold:</span>
                    <span className="text-text">{inv.minimum_threshold} units</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-subheading text-sm">Status:</span>
                    <span className={`text-text ${inv.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                      {inv.status}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-subheading text-sm mb-1">Delivery Pin Codes:</span>
                    <div className="flex flex-wrap gap-1">
                      {inv.delivery_pin_codes.map((pin, index) => (
                        <span key={index} className="px-2 py-1 bg-primary bg-opacity-10 text-primary rounded text-sm">
                          {pin}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInventory(inv)}
                  className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center justify-center"
                >
                  <FiEdit2 className="w-4 h-4 mr-2" />
                  Edit Inventory
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <BsBoxSeam className="w-16 h-16 mx-auto text-subheading mb-4" />
            <p className="text-text text-lg">No inventory items found</p>
            <p className="text-subheading mt-2">Try adjusting your search or add a new item</p>
          </div>
        )}
      </div>

      {selectedInventory && (
        <InventoryModal
          inventory={selectedInventory}
          onClose={() => setSelectedInventory(null)}
          onSuccess={() => {
            setSelectedInventory(null);
            fetchInventory();
          }}
        />
      )}

      {showAddModal && (
        <AddNewInventoryModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchInventory();
          }}
        />
      )}
    </div>
  );
}
