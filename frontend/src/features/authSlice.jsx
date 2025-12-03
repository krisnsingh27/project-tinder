import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";


export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Signup failed");
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);






export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const {data}=await axiosInstance.post("/auth/logout");
      console.log(data)
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
  
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state,action) => {
        state.loading = false;
        state.user = action.payload.message;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default authSlice.reducer;
