import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance"; 


export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async () => {
    const res = await axiosInstance.get("/connections/requests/received");
    return res.data.data;
  }
);






export const updateRequestStatus = createAsyncThunk(
  "requests/updateStatus",
  async ({ requestId, status }) => {
    let endpoint = "";

    if (status === "accept") endpoint = `/connections/accept/${requestId}`;
    if (status === "reject") endpoint = `/connections/reject/${requestId}`;
    if (status === "ignore") endpoint = `/connections/ignore/${requestId}`;

    await axiosInstance.put(endpoint);
    return requestId;
  }
);


const requestSlice = createSlice({
  name: "requests",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.list = state.list.filter((req) => req._id !== action.payload);
      });
  },
});

export default requestSlice.reducer;
