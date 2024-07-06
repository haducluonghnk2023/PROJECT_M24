import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AdminState, User } from "../interface/interface";



const initialState: AdminState = {
  users: [],
  loading: false,
  error: null,
};

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
