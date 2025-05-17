import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
import ShopDetailsDisplay from "./ShopDetailsDisplay";
import CreateShopModal from "./CreateShopModal";
import EditShopModal from "./EditShopModal";
import { selectUser } from "../../../../features/userInfo/userSlice";
import useShop from "../../../../services/useShop";
import { setShopData } from "../../../../features/shopSlice";

const googleMapsLibraries = ['places', 'marker'];

const ShopDetails = () => {
  const user = useSelector(selectUser);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const shopData = useSelector((state)=>state.shop.shopData)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: googleMapsLibraries
  });
  const dispatch = useDispatch();

  const { createShop, getShopDetails, updateShopDetails } = useShop();

  useEffect(() => {
    const fetchShopDetails = async () => {
      const response = await getShopDetails(user.id);
      if (response.success) {
        dispatch(setShopData(response.data));
        setIsRegistered(true);
      }

    };

    fetchShopDetails();
  }, [user.id]);

  const handleCreateShop = async (newShopData) => {
    const response = await createShop(newShopData);
    if (response.success) {
      dispatch(setShopData(response.data));
      setIsRegistered(true);
      setShowCreateModal(false);
    }
  };

  const handleUpdateShop = async (updatedShopData) => {
    const response = await updateShopDetails(updatedShopData, user.id);
    if (response.success) {
      setShopData(response.data);
      setShowEditModal(false);
    }
  };

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
          onClick={() => setShowCreateModal(true)}
        >
          <FaPlus className="text-5xl text-gray-400" />
          <p className="text-gray-500 mt-2">Register Your Shop</p>
        </div>
      ) : (
        <div>
          <ShopDetailsDisplay shopData={shopData} isLoaded={isLoaded} />
          <button
            className="mt-4 bg-secondary text-white px-4 py-2 rounded-lg"
            onClick={() => setShowEditModal(true)}
          >
            Edit Shop Details
          </button>
        </div>
      )}

      <CreateShopModal
        showModal={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateShop}
      />

      <EditShopModal
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdateShop}
        initialShopData={shopData}
      />
    </div>
  );
};

export default ShopDetails;