import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name:"Toogle",
    initialState:{
        filter:false,
        navbar:false,
        sliderImages:["https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg","https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"],
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