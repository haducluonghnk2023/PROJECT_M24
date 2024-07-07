import { createSlice,  PayloadAction } from "@reduxjs/toolkit";

import { AdminState, User } from "../interface/interface";
import { fetchUsers, updateUserStatus } from "../../service/course.servce";

const initialState: AdminState = {
  users: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "không tìm được người dùng";
      })
      
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserStatus.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          const updatedUser = action.payload;
          const index = state.users.findIndex(
            (user) => user.id === updatedUser.id
          );
          if (index !== -1) {
            state.users[index] = updatedUser;
          }
        }
      )
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "khong thể cập nhật trạng thái cho người dùng";
      });
  },
});

export const adminReducer = adminSlice.reducer;
