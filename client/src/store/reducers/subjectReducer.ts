import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSubject,
  fetchExamSubject,
  updateSubject,
} from "../../service/course.servce";

const initialState: any = {
  examSubject: [],
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchExamSubject.pending, (state: any) => {
        state.error = null;
      })
      .addCase(fetchExamSubject.fulfilled, (state: any, action: any) => {
        state.examSubject = action.payload;
      })
      .addCase(fetchExamSubject.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(deleteSubject.pending, (state: any) => {
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state: any, action: any) => {
        state.examSubject = state.examSubject.filter(
          (subject: any) => subject.id !== action.payload
        );
      })
      .addCase(deleteSubject.rejected, (state: any, action: any) => {
        state.error = action.error.message || "Không thể xóa khóa học";
      })
      .addCase(updateSubject.pending, (state: any) => {
        state.err = null;
      })
      .addCase(updateSubject.fulfilled, (state: any, action: any) => {
        const index = state.examSubject.findIndex(
          (subject: any) => subject.id === action.payload.id
        );

        if (index !== -1) {
          state.examSubject[index] = action.payload;
        }
      })
      .addCase(updateSubject.rejected, (state: any, action: any) => {
        state.err = action.payload;
      });
  },
});

export default adminSlice.reducer;
