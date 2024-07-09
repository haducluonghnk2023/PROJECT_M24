import { createSlice } from "@reduxjs/toolkit";
import {  fetchQuestion } from "../../service/course.servce";


const initialState: any = {
  question: [],
  error: null,
};

const questionSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(fetchQuestion.pending, (state:any) => {
        state.error = null;
      })
      .addCase(fetchQuestion.fulfilled, (state:any, action:any) => {
        state.question = action.payload;
      })
      .addCase(fetchQuestion.rejected, (state:any, action:any) => {
        state.error = action.payload;
      })
  },
});

export default questionSlice.reducer;
