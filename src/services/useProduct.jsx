import { useState } from "react";
import useRequest from "../utils/useRequest";
import { product } from "../utils/api"; // Assuming product routes are defined here

const useProduct = () => {
  const { Request } = useRequest();
  const [productDetails, setProductDetails] = useState(null);
  // Create a new product
  const createProduct = async (data) => {
    try {
      const response = await Request.post(product.createProduct, data);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const getAllProducts = async (page = 1, limit = 12) => {
    try {
      const response = await Request.get(`${product.getProductDetails}?page=${page}&limit=${limit}`);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  }

  // Get product details by ID
  const getProductDetails = async (productId) => {
    try {
      const response = await Request.get(`${product.getProductDetails}${productId}`);
      setProductDetails(response); // Save to state
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };



  // Update product details
  const updateProductDetails = async (productId, data) => {
    try {
      const response = await Request.put(`${product.updateProductDetails}${productId}`, data);
      
      setProductDetails(response); // Update local state
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Get filter options
  const getFilterOptions = async () => {
    try {
      const response = await Request.get(`${product.getProductDetails}filters/options`);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Filter products
  const filterProducts = async (filters, page = 1, limit = 12) => {
    try {
      const response = await Request.post(`${product.getProductDetails}filters?page=${page}&limit=${limit}`, filters);
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
    createProduct,
    getProductDetails,
    updateProductDetails,
    productDetails,
    getAllProducts,
    getFilterOptions,
    filterProducts
  };
};

export default useProduct;
