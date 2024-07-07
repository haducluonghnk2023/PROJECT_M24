import React, { useEffect, useState } from "react";
import "../../styles/allCourse.css";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fecthCourses } from "../../service/course.servce";

export default function AllExam() {
  const dispatch: AppDispatch = useDispatch();
  const course = useSelector((state: RootState) => state.admin.courses);

  useEffect(() => {
    dispatch(fecthCourses());
  }, [dispatch]);

  return (
    <div className="table-container">
      <input className="int" type="text" placeholder="Nhập tên cần tìm kiếm" />
      <table className="courses-table">
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
