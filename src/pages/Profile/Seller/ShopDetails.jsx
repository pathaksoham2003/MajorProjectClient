import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"; // Note the import of MarkerF
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import useShop from "../../../services/useShop";
import { selectUser } from "../../../features/userInfo/userSlice";
import { useSelector } from "react-redux";

// Categories for shop
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

// Static libraries array to prevent unnecessary re-renders
const googleMapsLibraries = ['places', 'marker']; // Ensure 'marker' is included

const ShopDetails = () => {
  const user = useSelector(selectUser);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shopData, setShopData] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ lat: null, lng: null });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: googleMapsLibraries
  });

  const { createShop, getShopDetails, updateShopDetails } = useShop();

  useEffect(() => {
    const fetchShopDetails = async () => {
      const response = await getShopDetails(user.id);
      if (response.success) {
        setShopData(response.data);
        setSelectedCategories(response.data.categories || []);
        setSelectedLocation(response.data.location || { lat: null, lng: null });
        setIsRegistered(true);
      }
    };

    fetchShopDetails();
  }, [user.id]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...shopData,
      categories: selectedCategories,
      location: selectedLocation,
    };

    let response;
    if (isRegistered) {
      response = await updateShopDetails(data, user.id);
      if (response.success) {
        setShopData(response.data);
        setShowModal(false);
      }
    } else {
      response = await createShop(data);
      if (response.success) {
        setShopData(response.data);
        setIsRegistered(true);
        setShowModal(false);
      }
    }
  };

  const onMapClick = useCallback((event) => {
    setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);

  if (loadError) {
    return <div>Error loading maps.</div>;
  }

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="p-6">
      {!isRegistered ? (
        <div
          className="flex flex-col items-center justify-center border-4 border-dashed border-gray-300 rounded-lg h-64 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="text-5xl text-gray-400" />
          <p className="text-gray-500 mt-2">Register Your Shop</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary mb-4">{shopData.name}</h2>
          <p className="mb-2"><strong>Description:</strong> {shopData.description}</p>
          <p className="mb-2"><strong>GST Number:</strong> {shopData.gst}</p>
          {shopData.location && shopData.location.lat && shopData.location.lng && (
            <p className="mb-2"><strong>Location:</strong> Lat {shopData.location.lat.toFixed(6)}, Lng {shopData.location.lng.toFixed(6)}</p>
          )}
          <p className="mb-2"><strong>Categories:</strong> {shopData.categories?.join(", ") || "Not specified"}</p>
          {shopData.location?.lat && shopData.location?.lng && (
            <div className="my-4">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "300px" }}
                center={shopData.location}
                zoom={15}
                options={{ disableDefaultUI: true, clickableIcons: false, gestureHandling: "greedy" }}
              >
                <MarkerF // Using MarkerF for AdvancedMarkerElement
                  position={shopData.location}
                  // You can customize the appearance of the AdvancedMarkerElement here
                />
              </GoogleMap>
            </div>
          )}
          <button
            className="mt-4 bg-secondary text-white px-4 py-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Edit Shop Details
          </button>
        </div>
      )}

      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">{isRegistered ? "Edit Shop Details" : "Register Shop"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Shop Name"
                className="w-full p-2 border rounded"
                onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
                value={shopData.name || ""}
                required
              />
              <input
                type="text"
                placeholder="Shop Description"
                className="w-full p-2 border rounded"
                onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
                value={shopData.description || ""}
                required
              />
              <input
                type="text"
                placeholder="GST Number"
                className="w-full p-2 border rounded"
                onChange={(e) => setShopData({ ...shopData, gst: e.target.value })}
                value={shopData.gst || ""}
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
                <p className="mb-2 font-medium">Select Location on Map</p>
                {isLoaded ? (
                  <div className="relative" style={{ width: '100%', height: '200px' }}>
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={selectedLocation.lat ? selectedLocation : { lat: 20.5937, lng: 78.9629 }}
                      zoom={selectedLocation.lat ? 15 : 4}
                      onClick={onMapClick}
                      options={{ disableDefaultUI: true, clickableIcons: false, gestureHandling: "greedy" }}
                    >
                      {selectedLocation.lat && selectedLocation.lng && (
                        <MarkerF // Using MarkerF for AdvancedMarkerElement
                          position={selectedLocation}
                          draggable
                          onDragEnd={onMarkerDragEnd}
                          // You can customize the appearance of the draggable AdvancedMarkerElement here
                        />
                      )}
                    </GoogleMap>
                  </div>
                ) : (
                  <div>Loading map...</div>
                )}
              </div>

              <button
                type="submit"
                className="bg-success text-white px-4 py-2 rounded w-full"
              >
                {isRegistered ? "Save Changes" : "Register Shop"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ShopDetails;