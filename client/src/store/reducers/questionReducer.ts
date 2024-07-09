import { createSlice } from "@reduxjs/toolkit";
import { deleteQuestion, fetchQuestion, updateQuestion } from "../../service/course.servce";


interface QuestionState {
  questions: any[];
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  error: null,
};

const questionSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestion.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchQuestion.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(fetchQuestion.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (question) => question.id !== action.payload.id
        );
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.error = action.error.message || "Không thể xóa câu hỏi";
      })
      .addCase(updateQuestion.pending, (state) => {
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.questions.findIndex(
          (question) => question.id === action.payload.id
        );
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
