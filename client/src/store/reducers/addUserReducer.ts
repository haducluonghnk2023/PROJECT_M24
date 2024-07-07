import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addUser:any = createAsyncThunk(
  'addUser/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/users', userData);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const addUserSlice:any = createSlice({
  name: 'addUser',
  initialState,
  reducers: {},
  extraReducers: (builder:any) => {
    builder
      .addCase(addUser.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addUserSlice.reducer;
