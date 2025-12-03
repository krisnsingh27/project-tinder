import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import feedReducer from "../features/feedSlice";
import requestReducer from "../features/requestSlice";
import friendReducer from "../features/friendSlice";
import profileReducer from "../features/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, 
     feed: feedReducer,
      requests: requestReducer,
       friends: friendReducer,
       profile:profileReducer
  },
});

export default store;
