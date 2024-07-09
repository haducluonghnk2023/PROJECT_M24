import { createSlice } from "@reduxjs/toolkit";
import {  fetchTest } from "../../service/course.servce";


const initialState: any = {
  test: [],
  error: null,
};

const testSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(fetchTest.pending, (state:any) => {
        state.error = null;
      })
      .addCase(fetchTest.fulfilled, (state:any, action:any) => {
        state.test = action.payload;
      })
      .addCase(fetchTest.rejected, (state:any, action:any) => {
        state.error = action.payload;
      })
  },
});

export default testSlice.reducer;
