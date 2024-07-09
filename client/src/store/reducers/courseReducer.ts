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

export const deleteCourse: any = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      await deleteCourseService(courseId);
      return courseId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCourse: any = createAsyncThunk(
  "courses/updateCourse",
  async (courseData: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/courses/${courseData.id}`,
        courseData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: any = {
  courses: [],
  err: null,
  loading: false,
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
      .addCase(deleteCourse.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.courses = state.courses.filter(
          (course: any) => course.id !== action.payload
        );
      })
      .addCase(deleteCourse.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || "Không thể xóa khóa học";
      })
      .addCase(updateCourse.pending, (state) => {
        state.err = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(
          (course: any) => course.id === action.payload.id
        );

        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.err = action.payload;
      });
  },
});
export const courseReducer = coursesSlice.reducer;
