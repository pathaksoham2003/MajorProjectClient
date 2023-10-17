import {createSlice} from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name:"Favorite",
    initialState:{
        favoriteItems:[]
    },
    reducers:{
        addToFavorite:(state,action)=>{
            state.favoriteItems = state.favoriteItems.push(action.payload)
        },
        removeFavorite:(state,action)=>{
            state.favoriteItems = state.favoriteItems.filter((product)=>product.id!==action.payload)
        }
    }
})

export default favoriteSlice.reducer;