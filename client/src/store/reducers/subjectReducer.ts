import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteSubjectService,
  fetchExamSubject,
} from "../../service/course.servce";
import axios from "axios";

const initialState: any = {
  examSubject: [],
  error: null,
};

export const deleteSubject: any = createAsyncThunk(
  "subject/deleteSubject",
  async (subjectId, { rejectWithValue }) => {
    try {
      await deleteSubjectService(subjectId);
      return subjectId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSubject: any = createAsyncThunk(
  "courses/updateCourse",
  async (subjectData: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/examSubject/${subjectData.id}`,
        subjectData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTest: any = createAsyncThunk(
  "tests/deleteTest",
  async (testId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/test/${testId}`);
      return testId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTest: any = createAsyncThunk(
  "test,updateTest",
  async (testData: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/test/${testData.id}`, testData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
