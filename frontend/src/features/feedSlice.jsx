import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance"; 

export const fetchFeed = createAsyncThunk("feed/fetchFeed", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/users/feed");
    return response.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeUserFromFeed: (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
