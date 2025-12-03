
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance"; 


export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const { data } = await axiosInstance.get("/users");
  return data.data; 
});


export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, updatedData }) => {
    const { data } = await axiosInstance.put(`/users/${id}`, updatedData);
    return data.data;
  }
);


export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axiosInstance.delete(`/users/${id}`);
  return id;
});

const profileSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = profileSlice.actions;
export default profileSlice.reducer;
