import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./modules/contentSlice";
import commentReducer from './modules/commentSlice'
const store = configureStore({
  reducer: {
    content:contentReducer,
    comment:commentReducer,
  },
});

export default store;