import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlicer";
import feedReducer from './feedSlice'
import requestReducer from "./requestSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    requests: requestReducer,
  },
});

export default store;