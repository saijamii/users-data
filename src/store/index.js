import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import userDetailsSlice from "./slices/userDetailsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    userDetails: userDetailsSlice,
  },
});
