import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  FetchUsersSearch, User } from "../store/interface/interface";

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

export const fetchUsers:any = createAsyncThunk<User[],FetchUsersSearch>(
  "admin/fetchUsers",
  async ({searchUser=''}) => {
    const response = await axios.get<User[]>(`http://localhost:8080/users?username_like=${searchUser}`,{
    });
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
  // console.log(response);
  return response.data;
});

export const deleteCourseService = async (courseId:any) => {
  try {
    const response = await axios.delete(`http://localhost:8080/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error("không thể xóa khóa học");
  }
};

export const deleteQuestionService = async (questionId:any) => {
  try {
    const response = await axios.delete(`http://localhost:8080/questions/${questionId}`);
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

export const addQuestion:any = createAsyncThunk("question/addQuestion", async (newQuestion,{rejectWithValue})=>{
  try {
    const res = await axios.post("http://localhost:8080/questions",newQuestion);
    return res.data;
  }
  catch (error:any) {
   return rejectWithValue(error.response.data);
  }
})


export const addUser:any = createAsyncThunk(
  'addUser/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/users', userData);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateQuestion: any = createAsyncThunk(
  "question/updateQuestion",
  async (questionData: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/questions/${questionData.id}`,
        questionData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuestion: any = createAsyncThunk(
  "question/deleteQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      await deleteQuestionService(questionId);
      return questionId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

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






