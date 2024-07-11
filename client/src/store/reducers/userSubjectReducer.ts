import { createSlice } from "@reduxjs/toolkit"
import {  fetchExamSubjectUser, getCourseId } from "../../service/course.servce"

const initialState = {
    test:[],
    error: null,
    id: 0,
}

const userReducer =createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder:any) => {
        builder
        .addCase(fetchExamSubjectUser.pending,(state:any)=>{
            state.error = null
        })
        .addCase(fetchExamSubjectUser.fulfilled,(state:any,action:any)=>{
            state.test = action.payload
        })
        .addCase(fetchExamSubjectUser.rejected,(state:any,action:any)=>{
            state.error = action.error.message || "Lỗi khi tải danh sách khóa học"
        })
        .addCase(getCourseId.fulfilled,(state:any, action:any) => {
            state.id = action.payload
        })
    }
})

export default userReducer.reducer;