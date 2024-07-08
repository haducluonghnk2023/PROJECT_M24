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

export const fetchTest:any = createAsyncThunk<any>("admin/fetchTest",
  async ()=>{
    const res = await axios.get("http://localhost:8080/test");
    console.log(res);
    return res.data;
  }
)

// hoạt động  bất đồng bộ
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

// export const researchUser:any = createAsyncThunk<User[], string>(
//   "admin/researchUser",
//   async (name) => {
//     const response = await axios.get(`http://localhost:8080/users?username_like=${name}`);
//     return response.data;
//   }
// );
// course.service.ts


export const deleteCourseService = async (courseId:any) => {
  try {
    const response = await axios.delete(`http://localhost:8080/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error("không thể xóa khóa học");
  }
};





