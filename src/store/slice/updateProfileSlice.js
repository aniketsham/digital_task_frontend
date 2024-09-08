import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProfileRequest(state, action) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updateProfileFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    updateProfileIdRequest(state, action) {
      state.loading = true;
    },
    updateProfileIdSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updateProfileIdFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    updatePasswordRequest(state, action) {
      state.loading = true;
    },
    updatePasswordSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    profileResetAfterUpdate(state, action) {
      state.error = null;
      state.isUpdated = false;
      state.loading = false;
    },
  },
});

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      "https://digitalsalt-task.onrender.com/api/updateProfile",
      data,
      {
        withCredentials: true,
        headers:{ "Content-Type": "application/json" },
      }
    );
    dispatch(updateProfileSlice.actions.updateProfileSuccess());
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updateProfileFailed(
        error.response.data.message || "Failed to update profile."
      )
    );
  }
};
export const updateProfileId = (data,id) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileIdRequest());
  try {
    const response = await axios.put(
      `https://digitalsalt-task.onrender.com/api//updateById/${id}`,
      data,
      {
        withCredentials: true,
        headers:{ "Content-Type": "application/json" },
      }
    );
    dispatch(updateProfileSlice.actions.updateProfileIdSuccess());
  } catch (error) {
    dispatch(
      updateProfileSlice.actions.updateProfileIdFailed(
        error.response.data.message || "Failed to update profile."
      )
    );
  }
};


export const clearAllUpdateProfileErrors = () => (dispatch) => {
  dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer;