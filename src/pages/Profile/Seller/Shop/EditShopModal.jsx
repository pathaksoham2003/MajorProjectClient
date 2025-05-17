import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { motion } from "framer-motion";

const categoriesList = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports",
  "Beauty",
  "Stationary",
  "Toys",
  "Other"
];

const EditShopModal = ({ showModal, onClose, onUpdate, initialShopData }) => {
  const [shopData, setShopData] = useState(initialShopData || {});
  const [selectedCategories, setSelectedCategories] = useState(initialShopData?.categories || []);
  const [selectedLocation, setSelectedLocation] = useState(initialShopData?.location || { lat: null, lng: null });

  useEffect(() => {
    if (initialShopData) {
      setShopData(initialShopData);
      setSelectedCategories(initialShopData.categories || []);
      setSelectedLocation(initialShopData.location || { lat: null, lng: null });
    }
  }, [initialShopData]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const onMarkerDragEnd = useCallback((event) => {
    setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...shopData, categories: selectedCategories, location: selectedLocation });
  };

  if (!showModal) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Shop Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... (rest of the form fields) ... */}
          <input
            type="text"
            placeholder="Shop Name"
            className="w-full p-2 border rounded"
            value={shopData.name || ""}
            onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Shop Description"
            className="w-full p-2 border rounded"
            value={shopData.description || ""}
            onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="GST Number"
            className="w-full p-2 border rounded"
            value={shopData.gst || ""}
            onChange={(e) => setShopData({ ...shopData, gst: e.target.value })}
            required
          />

          <div>
            <p className="mb-2 font-medium">Select Categories</p>
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1 rounded-full border ${selectedCategories.includes(category) ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium">Update Location on Map</p>
            <div className="relative" style={{ width: '100%', height: '200px' }}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={selectedLocation.lat ? selectedLocation : { lat: 20.5937, lng: 78.9629 }}
                zoom={selectedLocation.lat ? 15 : 4}
                options={{ disableDefaultUI: true, clickableIcons: false, gestureHandling: "greedy" }}
              >
                {selectedLocation.lat && selectedLocation.lng && (
                  <MarkerF // Using MarkerF for AdvancedMarkerElement
                    position={selectedLocation}
                    draggable
                    onDragEnd={onMarkerDragEnd}
                  />
                )}
              </GoogleMap>
            </div>
          </div>

          <button
            type="submit"
            className="bg-success text-white px-4 py-2 rounded w-full"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditShopModal;