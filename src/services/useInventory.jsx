import { useState } from "react";
import useRequest from "../utils/useRequest";
import { inventory } from "../utils/api";

const useInventory = () => {
  const { Request } = useRequest();
  const [inventoryDetails, setInventoryDetails] = useState(null);

  // Get all inventory items
  const getAllInventory = async () => {
    try {
      const response = await Request.get(inventory.getAllInventory);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Get inventory by ID
  const getInventoryById = async (id) => {
    try {
      const response = await Request.get(inventory.getInventoryById(id));
      setInventoryDetails(response);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Create new inventory item
  const createInventory = async (inventoryData) => {
    try {
      const response = await Request.post(inventory.createInventory, inventoryData);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Update inventory item
  const updateInventory = async (id, updateData) => {
    try {
      const response = await Request.put(inventory.updateInventory(id), updateData);
      setInventoryDetails(response);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Delete inventory item
  const deleteInventory = async (id) => {
    try {
      const response = await Request.delete(inventory.deleteInventory(id));
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Get inventory by pin code
  const getInventoryByPinCode = async (pinCode) => {
    try {
      const response = await Request.get(inventory.getInventoryByPinCode(pinCode));
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  return {
    getAllInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory,
    getInventoryByPinCode,
    inventoryDetails
  };
};

export default useInventory;