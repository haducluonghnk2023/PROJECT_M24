import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../store/interface/interface";

export const fetchCourses :any = createAsyncThunk<any>(
    "admin/fetchCourses",
    async ()=>{
      const res = await axios.get("http://localhost:8080/courses");
      // console.log(res);
      return res.data;
    }
)

export const fetchQuestion:any = createAsyncThunk<any>("admin/fecthQuestion",
  async ()=>{
    const res = await axios.get("http://localhost:8080/questions");
    // console.log(res);
    return res.data;
  }
)

export const fetchTest:any = createAsyncThunk<any>("admin/fetchTest",
  async ()=>{
    const res = await axios.get("http://localhost:8080/test");
    // console.log(res);
    return res.data;
  }
)

export const fetchUsers:any = createAsyncThunk<User[]>(
  "admin/fetchUsers",
  async () => {
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
  }
);

export const updateUserStatus:any = createAsyncThunk<
  User,
  { userId: number; status: number }
>("admin/updateUserStatus", async ({ userId, status }) => {
  const response = await axios.patch(`http://localhost:8080/users/${userId}`, {
    status,
  });
  console.log(response);
  return response.data;
});

export const deleteCourseService = async (courseId:any) => {
  try {
    const response = await axios.delete(`http://localhost:8080/examSubject/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error("không thể xóa khóa học");
  }
};

export const deleteSubjectService = async (subjectId:any) => {
  try {
    const response = await axios.delete(`http://localhost:8080/examSubject/${subjectId}`);
    return response.data;
  } catch (error) {
    throw new Error("không thể xóa môn học");
  }
}

export const fetchExamSubject: any = createAsyncThunk<any>(
  "admin/fetchExamSubject",
  async () => {
    const res = await axios.get("http://localhost:8080/examSubject");
    return res.data;
  }
);

export const addSubject:any = createAsyncThunk(
  "subjects/addSubject",
  async (newCourse, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/examSubject", newCourse);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTest:any = createAsyncThunk("test/addTest", async (newTest,{ rejectWithValue}) => {
  try {
    const response = await axios.post("http://localhost:8080/test", newTest);
    return response.data;
  }
  catch (error:any) {
    return rejectWithValue(error.response.data);
  }
})






