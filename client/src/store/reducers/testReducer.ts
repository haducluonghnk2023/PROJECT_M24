import {  createSlice } from "@reduxjs/toolkit";
import {  deleteTest, fetchTest, updateTest } from "../../service/course.servce";

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
      .addCase(deleteTest.pending, (state: any) => {
        state.error = null;
      })
      .addCase(deleteTest.fulfilled, (state: any, action: any) => {
        state.test = state.test.filter(
          (subject: any) => subject.id !== action.payload
        );
      })
      .addCase(deleteTest.rejected, (state: any, action: any) => {
        state.error = action.error.message || "Không thể xóa khóa học";
      })
      .addCase(updateTest.pending, (state: any) => {
        state.error = null;
      })
      .addCase(updateTest.fulfilled, (state: any, action: any) => {
        const index = state.test.findIndex(
          (subject: any) => subject.id === action.payload.id
        );

        if (index !== -1) {
          state.test[index] = action.payload;
        }
      })
      .addCase(updateTest.rejected, (state: any, action: any) => {
        state.err = action.payload;
      });
  },
});

export default testSlice.reducer;
