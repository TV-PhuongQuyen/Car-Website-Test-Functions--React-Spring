// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./ProfileStore";

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;
