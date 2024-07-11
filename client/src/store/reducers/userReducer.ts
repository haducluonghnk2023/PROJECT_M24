import { createSlice } from "@reduxjs/toolkit"
import { fetchCourse } from "../../service/course.servce"

const initialState = {
    examSubject:[],
    error: null,
}

const userReducer =createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder:any) => {
        builder
        .addCase(fetchCourse.pending,(state:any)=>{
            state.error = null
        })
        .addCase(fetchCourse.fulfilled,(state:any,action:any)=>{
            state.examSubject = action.payload
        })
        .addCase(fetchCourse.rejected,(state:any,action:any)=>{
            state.error = action.error.message || "Lỗi khi tải danh sách khóa học"
        })
    }
})

export default userReducer.reducer;