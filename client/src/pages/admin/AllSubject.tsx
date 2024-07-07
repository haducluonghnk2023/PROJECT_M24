import React, { useEffect, useState } from "react";
import "../../styles/allSubject.css";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
// import { fecthCourses } from "../../service/course.servce";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTest: any = createAsyncThunk<any>("admin/fetchTest", async () => {
  const res = await axios.get("http://localhost:8080/test");
  // console.log(res.data);
  return res.data;
});
export default function AllSubject() {
  const dispatch: AppDispatch = useDispatch();
  const subject = useSelector((state: RootState) => state);
  console.log(subject);

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  return (
    <div className="table-container">
      <input className="int" type="text" placeholder="Nhập tên cần tìm kiếm" />
      <table className="subject-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Khóa luyen thi toan</td>
            <td>aa</td>
            <td>
              <button className="btn-edit">Sửa</button>
              <button className="btn-delete">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
