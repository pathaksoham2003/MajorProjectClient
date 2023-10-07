import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {createUser,checkUser} from "../../utils/api";

export const createUser = createAsyncThunk("User/create",async(userData)=>{
    const response = await fetch(createUser,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    })
    const data = await response.json();
    return data;
})


const userSlice = createSlice({
    name:"User",
    initialState:{
        user_id:"",
        name:"",
        email:"",
        google_id:"",
        picture:"",
        error:"",
        loading:false,
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUser.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(createUser.fulfilled , (state,action)=>{
            state.loading = false;
            state = action.payload;
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})
