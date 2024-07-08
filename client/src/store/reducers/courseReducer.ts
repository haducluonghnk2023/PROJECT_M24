import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { deleteCourseService, fetchCourses } from "../../service/course.servce";
import axios from "axios";

export const addCourse: any = createAsyncThunk(
  "course/course",
  async (userCourse, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/courses",
        userCourse
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCourse:any = createAsyncThunk(
    "courses/deleteCourse",
    async (courseId, { rejectWithValue }) => {
      try {
        await deleteCourseService(courseId);
        return courseId;
      } catch (error:any) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  


const initialState: any = {
  courses: [],
  err: null,
  loading: false
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.err = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {  
        state.err = action.err.message || "không tìm được người dùng";
      })
      .addCase(addCourse.pending, (state) => {
        state.err = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.err = action.payload;
      })
      .addCase(deleteCourse.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.courses = state.courses.filter((course:any) => course.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.error.message || "Không thể xóa khóa học";
      })
     

  },
});
export const courseReducer = coursesSlice.reducer;
