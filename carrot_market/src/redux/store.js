import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./modules/contentSlice";

const store = configureStore({
  reducer: {
    content:contentReducer
  },
});

export default store;