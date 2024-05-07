import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name:"Toogle",
    initialState:{
        filter:false,
        navbar:false,
        sliderImages:["https://wallpapers.com/images/high/clothes-background-qki8kukg6xull61r.webp"],
        currentImage:0,
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
        },
        nextImage:(state,action)=>{
            if (state.currentImage==state.sliderImages.length-1){
                state.currentImage = 0;
                return 
            }
            state.currentImage = (state.currentImage+1);
        },
    }
})

export const selectSliderImages = (state) => state.toogle.sliderImages;
export const selectCurrentImage = (state) => state.toogle.currentImage;

export const selectFilterState = (state) => state.toogle.filter;
export const selectNavbar = (state) => state.toogle.navbar;
export const {toogleFilter,toogleNavbar,closeNavbar,nextImage} = toogleSlice.actions;
export default toogleSlice.reducer;