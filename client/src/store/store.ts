import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./reducers/adminReducer";
import { courseReducer } from "./reducers/courseReducer";
import addUserReducer from "./reducers/addUserReducer";

const store:any = configureStore({
  reducer: {
    admin:adminReducer ,
    courses:courseReducer,
    addUser:addUserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
