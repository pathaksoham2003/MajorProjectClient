import useRequest from '../utils/useRequest';
import { addressBase } from '../utils/api';

const useAddress = () => {
  const { Request } = useRequest();

  // Get all addresses
  const getAddresses = async () => {
    try {
      const response = await Request.get(addressBase);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Add address
  const addAddress = async (addressData) => {
    try {
      const response = await Request.post(addressBase, addressData);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Remove address
  const removeAddress = async (addressId) => {
    try {
      const response = await Request.delete(`${addressBase}${addressId}`);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Update address
  const updateAddress = async (addressId, addressData) => {
    try {
      const response = await Request.put(`${addressBase}${addressId}`, addressData);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Set default address
  const setDefaultAddress = async (addressId) => {
    try {
      const response = await Request.put(`${addressBase}${addressId}/default`);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  return { getAddresses, addAddress, removeAddress, setDefaultAddress, updateAddress };
};

export default useAddress;