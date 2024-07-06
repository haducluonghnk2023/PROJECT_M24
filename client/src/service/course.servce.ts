import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fecthCourses :any = createAsyncThunk<any>(
    "admin/fetchCourses",
    async ()=>{
      const res = await axios.get("http://localhost:8080/courses");
      return res.data;
    }
  )