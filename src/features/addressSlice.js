import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: [],
  reducers: {
    setAddresses: (state, action) => {
      return action.payload;
    },
    addAddress: (state, action) => {
      state.push(action.payload);
    },
    removeAddress: (state, action) => {
      return state.filter(address => address.id !== action.payload);
    },
    setDefaultAddress: (state, action) => {
      const defaultId = action.payload;
      return state.map(address => ({
        ...address,
        isDefault: address.id === defaultId
      }));
    }
  }
});

export const { setAddresses, addAddress, removeAddress, setDefaultAddress } = addressSlice.actions;
export default addressSlice.reducer;
