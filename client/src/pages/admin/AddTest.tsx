import React, { useState } from "react";
import "../../styles/addTest.css";
export default function AddTest() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  return (
    <div className="add-test">
      <h2>Thêm đề thi mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm đề thi thành công!</p>
        </div>
      )}

      <form>
        <input type="text" name="title" placeholder="Tên đề thi" />
        <input type="text" name="description" placeholder="Mô tả" />
        <input type="text" name="duration" placeholder="Thời gian" />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
