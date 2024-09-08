import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getAllUserSlice = createSlice({
    name: "getAllUser",
    initialState:{
        loading:false,
        users:[],
        error:null,
        message:null,
    },
    reducers: {

    getAllUsersRequest(state, action) {
        state.loading=true;
        state.users=[];
        state.error=null;
        state.message=null;
          },
          getAllUsersSuccess(state, action) {
            state.loading=false;
            state.users=action.payload;
            state.error=null;
            state.message=action.payload.message
          },
          getAllUsersFailed(state, action) {
            state.users=state.users;
            state.error=action.payload.message;
            state.message=null
          },
          requestForDeleteUser(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          successForDeleteUser(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
          },
          failureForDeleteUser(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
          },
          clearAllGetUserErrors(state, action) {
            state.error = null;
            state.users = state.users;
          },
          resetGetUserSlice(state, action) {
            state.error = null;
            state.applications = state.applications;
            state.message = null;
            state.loading = false;
          },
    }
})

export const getAllUsers = () =>async(dispatch)=>{
    dispatch(getAllUserSlice.actions.getAllUsersRequest());
    try {
      const response = await axios.get(
        "https://digitalsalt-task.onrender.com/api/getUsers",
        {
          withCredentials: true,
        }
      );
      console.log(response)
      dispatch(getAllUserSlice.actions.getAllUsersSuccess(response.data.users));
      dispatch(getAllUserSlice.actions.clearAllGetUserErrors());
    } catch (error) {
      console.log(error)
      dispatch(getAllUserSlice.actions.getAllUsersFailed(error.response.data.message));
    }
}
export const deleteUser = (id) => async (dispatch) => {
  dispatch(getAllUserSlice.actions.requestForDeleteUser());
  try {
    const response = await axios.delete(
      `https://digitalsalt-task.onrender.com/api/deleteUser/${id}`,
      { withCredentials: true }
    );
    dispatch(
      getAllUserSlice.actions.successForDeleteUser(
        response.data.message
      )
    );
    dispatch(clearAllGetUserErrors());
  } catch (error) {
    dispatch(
      getAllUserSlice.actions.failureForDeleteUser(
        error.response.data.message
      )
    );
  }
};


export const clearAllGetUserErrors = () => (dispatch) => {
  dispatch(getAllUserSlice.actions.clearAllGetUserErrors());
};

export const resetGetUserSlice = () => (dispatch) => {
  dispatch(getAllUserSlice.actions.resetGetUserSlice());
};
export default getAllUserSlice.reducer;

