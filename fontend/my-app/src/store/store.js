// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./ProfileStore";
import postReducer from "./postStore";   // thêm dòng này

const store = configureStore({
  reducer: {
    profile: profileReducer,
    post: postReducer,     // và thêm dòng này
  },
});

export default store;
