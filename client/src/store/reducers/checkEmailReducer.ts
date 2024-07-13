import { createSlice } from "@reduxjs/toolkit"
import { checkEmail } from "../../service/course.servce"

const initialState = {
    user:[]
}

const checkEmailReducer =createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder:any) => {
        builder
        .addCase(checkEmail.pending,(state:any)=>{
            state.err = null
        })
        .addCase(checkEmail.fulfilled,(state:any,action:any)=>{
            state.user = action.payload
        })
        .addCase(checkEmail.rejected,(state:any,action:any)=>{
            state.err = action.err.message || "email đã tồn tại";
        })
    }
})

export default checkEmailReducer.reducer;