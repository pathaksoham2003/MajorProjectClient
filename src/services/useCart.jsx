import React from 'react'
import useRequest from '../utils/useRequest';
import { cart } from '../utils/api';

const useCart = () => {
  const { Request } = useRequest();

  // Get cart items
  const getCart = async () => {
    try {
      const response = await Request.get(cart.getCart);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await Request.post(cart.addToCart, { productId, quantity });
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Update cart item quantity
  const updateCartItem = async (cartItemId, quantity) => {
    try {
      const response = await Request.put(cart.updateCartItem(cartItemId), { quantity });
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Remove from cart
  const removeFromCart = async (cartItemId) => {
    try {
      const response = await Request.delete(cart.removeFromCart(cartItemId));
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        status: error.status,
        message: error.message,
      };
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await Request.delete(cart.clearCart);
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
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };
};

export default useCart