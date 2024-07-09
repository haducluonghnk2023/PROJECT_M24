import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./reducers/adminReducer";
import { courseReducer } from "./reducers/courseReducer";
import addUserReducer from "./reducers/addUserReducer";
import subjectReducer from "./reducers/subjectReducer";
import testReducer from "./reducers/testReducer";
import questionReducer from "./reducers/questionReducer";


const store:any = configureStore({
  reducer: {
    admin:adminReducer ,
    courses:courseReducer,
    addUser:addUserReducer,
    addSubject:subjectReducer,
    test:testReducer,
    question:questionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
