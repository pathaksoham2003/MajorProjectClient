import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {createUser,checkUser} from "../../utils/api";

const createUser = createAsyncThunk("User/create",async(userData)=>{
    const response = await fetch(createUser,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    })
    const data = await response.json();
})


const userSlice = createSlice({
    name:"User",
    initialState:{
        user_id:"",
        name:"",
        email:"",
        google_id:"",
        picture:"",
        address:"",
        error:"",
        loading:false,
    },
    reducers:{

    },
    extraReducers:(builder)=>{

    }
})
