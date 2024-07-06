import { createSlice } from '@reduxjs/toolkit';

const initialState:any = {
  users: [],
  loading: false,
  error: null,
};

const addUserSlice:any = createSlice({
  name: 'addUser',
  initialState,
  reducers: {
    addUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addUserRequest, addUserSuccess, addUserFailure } = addUserSlice.actions;
export default addUserSlice.reducer;