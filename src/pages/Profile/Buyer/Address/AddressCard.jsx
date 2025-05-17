import {useState} from "react";
import useAddress from "../../../../services/useAddress";

export default function AddressCard({address, onSetDefault}) {
  const {setDefaultAddress} = useAddress();

  const handleSetDefault = async () => {
    const response = await setDefaultAddress(address.id);
    if (response.success) {
      onSetDefault(address.id);
    }
  };

  return (
    <div
      className={`p-4 rounded border ${
        address?.isDefault
          ? "border-primary bg-primary/20"
          : "border-gray-300"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-heading">{address.label}</p>
          <p className="text-heading">{address.street_address}</p>
          <p className="text-heading">
            {address.city},<br/> {address.state}<br/> {address.postal_code}
          </p>
        </div>
        <div className="text-right">
          {!address?.isDefault ? (
            <button
              onClick={handleSetDefault}
              className="text-sm px-3 py-1 text-nowrap rounded bg-primary text-white hover:bg-primary/90 duration-200 transition-colors cursor-pointer"
            >
              Set Default
            </button>
          ) : (
            <span
              onClick={handleSetDefault}
              className="text-sm text-primary font-medium cursor-pointer"
            >
              Default
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
