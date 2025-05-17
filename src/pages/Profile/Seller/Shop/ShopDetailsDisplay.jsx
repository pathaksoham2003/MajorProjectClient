import React from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

const ShopDetailsDisplay = ({ shopData, isLoaded }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-primary mb-4">{shopData.name}</h2>
      <p className="mb-2"><strong>Description:</strong> {shopData.description}</p>
      <p className="mb-2"><strong>GST Number:</strong> {shopData.gst}</p>
      {shopData.location && shopData.location.lat && shopData.location.lng && (
        <p className="mb-2"><strong>Location:</strong> Lat {shopData.location.lat.toFixed(6)}, Lng {shopData.location.lng.toFixed(6)}</p>
      )}
      <p className="mb-2"><strong>Categories:</strong> {shopData.categories?.join(", ") || "Not specified"}</p>
      {isLoaded && shopData.location?.lat && shopData.location?.lng && (
        <div className="my-4">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "300px" }}
            center={shopData.location}
            zoom={15}
            options={{ disableDefaultUI: true, clickableIcons: false, gestureHandling: "greedy" }}
          >
            <MarkerF // Using MarkerF for AdvancedMarkerElement
              position={shopData.location}
            />
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default ShopDetailsDisplay;