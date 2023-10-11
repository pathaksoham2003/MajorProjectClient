import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../utils/api";

const getAllProducts = createAsyncThunk("Products/getAll",async()=>{
    const response = await fetch(getAllProducts);
    const data = await response.json();
    return data;
})

const allProductsSlice = createSlice({
    name:"Product",
    initialState:{
        error:"",
        loading:false,
        products:[]
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.fulfilled,(state,action)=>{
            state.products = action.payload;
            return state;
        })
    }
})
export const loadingSelector = (state)=>{
    return state.product.loading;
}
export const allProductsSelector = (state) => {
    return state.product.products;
} 
export default allProductsSlice.reducer;
