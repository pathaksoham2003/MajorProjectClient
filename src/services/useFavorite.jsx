import useRequest from '../utils/useRequest';
import { favorite } from '../utils/api';

const useFavorite = () => {
  const { Request } = useRequest();

  // Get all favorites
  const getFavorites = async () => {
    try {
      const response = await Request.get(favorite.getAllFavorites);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Add to favorites
  const addToFavorites = async (productId) => {
    try {
      const response = await Request.post(favorite.addToFavorites, { productId });
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (productId) => {
    try {
      const response = await Request.delete(favorite.removeFromFavorites(productId));
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Check if product is in favorites
  const checkFavorite = async (productId) => {
    try {
      const response = await Request.get(favorite.checkFavorite(productId));
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
    getFavorites,
    addToFavorites,
    removeFromFavorites,
    checkFavorite,
  };
};

export default useFavorite;