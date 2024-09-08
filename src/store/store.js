import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import updateProfileReducer from "./slice/updateProfileSlice";
import getAllUsersReducer from "./slice/getAllUsers";



 const store = configureStore({
  reducer: {
    user: userReducer,
    updateProfile: updateProfileReducer,
    getAllUsers:getAllUsersReducer,
  },
});

export default store


