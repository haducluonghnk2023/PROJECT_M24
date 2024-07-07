import React, { useState } from "react";
import "../../styles/addCourse.css";
export default function AddExam() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  return (
    <div className="add-courses">
      <h2>Thêm khóa thi mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm khóa thi thành công!</p>
        </div>
      )}

      <form>
        <input type="text" name="title" placeholder="Tên khóa thi" />
        <input type="text" name="description" placeholder="Mô tả" />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
