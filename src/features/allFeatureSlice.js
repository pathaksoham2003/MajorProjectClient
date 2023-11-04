import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name:"Toogle",
    initialState:{
        filter:false,
        navbar:false,
    },
    reducers:{
        toogleFilter: (state,action)=>{
            state.filter = !state.filter;
        },
        toogleNavbar: (state,action)=>{
            state.navbar = !state.navbar;
        },
        closeNavbar:(state,action)=>{
            state.navbar = false;
        }
    }
})

export const selectFilterState = (state) => state.toogle.filter;
export const selectNavbar = (state) => state.toogle.navbar;
export const {toogleFilter,toogleNavbar,closeNavbar} = toogleSlice.actions;
export default toogleSlice.reducer;