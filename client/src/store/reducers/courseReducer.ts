import {  createSlice } from "@reduxjs/toolkit";

import { fecthCourses } from "../../service/course.servce";

const initialState:any  ={
    courses:[],
    err:null
}
  const coursesSlice = createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fecthCourses.pending,(state)=>{
            state.err=null;
        })
        .addCase(fecthCourses.fulfilled,(state,action)=>{
            state.courses= action.payload
        })
        .addCase(fecthCourses.rejected, (state, action) => {
            state.err = action.err.message || "không tìm được người dùng";
        })
    }
  })
  export const  courseReducer = coursesSlice.reducer
