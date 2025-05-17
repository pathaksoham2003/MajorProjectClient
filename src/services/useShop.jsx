import {useState} from "react";
import useRequest from "../utils/useRequest";
import {shop} from "../utils/api"; // Assuming you have the shop API routes in the `api.js` file
import { useDispatch } from "react-redux";
import { setFilterOptions, setShopProducts } from "../features/shopSlice";

const useShop = () => {
  const {Request} = useRequest();
  const dispatch = useDispatch();
  const [shopDetails, setShopDetails] = useState(null);
  
  // Create a new shop
  const createShop = async (data) => {
    try {
      const response = await Request.post(shop.createShop, data);
      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Get details of the shop
  const getShopDetails = async (seller_id) => {
    try {
      const response = await Request.get(`${shop.getShopDetails}${seller_id}`);
      setShopDetails(response); // Set the details to state
      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const updateShopDetails = async (data, seller_id) => {
    try {
      const response = await Request.put(
        `${shop.updateShopDetails}${seller_id}`,
        data
      );
      setShopDetails(response); 
      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const getProductsAtShop = async () => {
    try {
      const response = await Request.get(`${shop.getProducts}`);
      dispatch(setShopProducts(response));
      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  const getFilterOptions = async () => {
    try{
      const response = await Request.post(`${shop.filterOptions}`);
      console.log("Response",response)
      dispatch(setFilterOptions(response))
      return {success: true, data: response};
    }catch(error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  }

  const filterProducts = async (filters) => {
    try {
      const response = await Request.post(`${shop.filterProducts}`,filters);
      dispatch(setShopProducts(response));
      return {success: true, data: response};
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  }

  return {
    createShop,
    getShopDetails,
    updateShopDetails,
    shopDetails,
    filterProducts,
    getFilterOptions,
    getProductsAtShop,
  };
};

export default useShop;
