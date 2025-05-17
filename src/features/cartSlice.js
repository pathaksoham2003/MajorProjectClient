import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload.map(item => ({
        ...item,
        quantity: Number(item.quantity)
      }));
    },
    addCartItem: (state, action) => {
      const newItem = {
        ...action.payload,
        quantity: Number(action.payload.quantity)
      };
      state.items.push(newItem);
    },
    updateCartItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...action.payload,
          quantity: Number(action.payload.quantity)
        };
      }
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
  setLoading,
  setError
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart?.items || [];
export const selectCartLoading = (state) => state.cart?.loading || false;
export const selectCartError = (state) => state.cart?.error || null;
export const selectCartTotal = (state) => {
  const items = state.cart?.items || [];
  return items.reduce((total, item) => {
    if (!item?.Product?.price) return total;
    return total + (item.Product.price * Number(item.quantity));
  }, 0);
};
export const selectCartItemCount = (state) => {
  const items = state.cart?.items || [];
  return items.reduce((count, item) => {
    if (!item?.quantity) return count;
    return count + Number(item.quantity);
  }, 0);
};

export default cartSlice.reducer;
