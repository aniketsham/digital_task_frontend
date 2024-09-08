import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    isAdmin:false,
    user: {},
    updatingProfile:{},
    error: null,
    message: null,
  },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isAdmin=action.payload.user.role==="Admin";
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isAdmin=action.payload.user.role==="Admin";
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.isAdmin=false
      state.user = {};
      state.error = action.payload;
      state.message = null;
    },
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.isAdmin=false;
      state.user = action.payload;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.isAdmin=false;
      state.user = {};
      state.error = action.payload;
    },
    fetchUserForUpdateRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.updatingProfile = {};
      state.error = null;
    },
    fetchUserForUpdateSuccess(state, action) {
      state.loading = false;
      state.isAdmin=false;
      state.updatingProfile = action.payload;
      state.error = null;
    },
    fetchUserForUpdateFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.isAdmin=false;
      state.updatingProfile = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.isAdmin=false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.user = state.user;
      state.updatingProfile = state.updatingProfile;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "https://digitalsalt-task.onrender.com/api/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },    
        }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data.message));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "https://digitalsalt-task.onrender.com/api/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const getMyProfile = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "https://digitalsalt-task.onrender.com/api/getMyProfile",
      {
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {

    dispatch(userSlice.actions.fetchUserFailed(error.response || "Failed to get profile."));
  }
};

export const getProfileId = (id) => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserForUpdateRequest());
  try {
    const response = await axios.get(
      `https://digitalsalt-task.onrender.com/api/getProfileId/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.fetchUserForUpdateSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {

    dispatch(userSlice.actions.fetchUserForUpdateFailed(error.response || "Failed to get profile."));
  }
};


export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://digitalsalt-task.onrender.com/api/logout",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;