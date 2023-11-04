import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, checkUser, getSpecific } from "../../utils/api";

export const getSpecificUser = createAsyncThunk(
  "User/getSpecific",
  async (google_id_state) => {
    const response = await fetch(`${getSpecific}${google_id_state}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    localStorage.setItem("user_id",data.user_id);
    return data;
  }
);

export const postData = createAsyncThunk("User/postData", async (obj) => {
  const response = await fetch(createUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await response.json();
  console.log(data);
  localStorage.setItem("user_id",data.user_id);
  return data;
});

const userSlice = createSlice({
  name: "User",
  initialState: {
    user_id: "",
    name: "",
    email: "",
    google_id: "",
    picture: "",
    error: "",
    loading: false,
  },
  reducers: {
    clearUser: (state, action) => {
      return {
        user_id: "",
        name: "",
        email: "",
        picture: "",
        selectedTheme:"light",
        error: "",
        loading: false,
      };
    },
    setSelectedTheme: (state,action)=>{
      state.selectedTheme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        // Update individual properties instead of assigning the entire action payload
        state.user_id = action.payload.user_id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.google_id = action.payload.google_id;
        state.picture = action.payload.picture;
        state.error = "";
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSpecificUser.pending,(state,action)=>{
        state.loading = true;
      })
      .addCase(getSpecificUser.fulfilled,(state,action)=>{
        state.loading = false;
        // Update individual properties instead of assigning the entire action payload
        state.user_id = action.payload.user_id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.google_id = action.payload.google_id;
        state.picture = action.payload.picture;
        state.error = "";
      })
      .addCase(getSpecificUser.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearUser , setSelectedTheme } = userSlice.actions;

export const selectedTheme = (state) => state.user.selectedTheme;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
