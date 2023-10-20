import {createSlice} from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name:"Favorite",
    initialState:{
        favoriteItems:[]
    },
    reducers:{
        addToFavorite:(state,action)=>{
            const found = state.favoriteItems.find((product)=>product.product_id === action.payload.product_id);
            if(found){
                return;
            }
            state.favoriteItems = [...state.favoriteItems, action.payload]
        },
        removeFavorite:(state,action)=>{
            
            state.favoriteItems = state.favoriteItems.filter((product)=> product.product_id !== action.payload)
        }
    }
})
export const favoriteSelector = (state) => {
    return state.favorite.favoriteItems;
}
export const {addToFavorite,removeFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;