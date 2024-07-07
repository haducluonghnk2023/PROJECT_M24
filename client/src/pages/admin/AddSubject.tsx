import React, { useState } from "react";
import "../../styles/addSubject.css";
export default function AddSubject() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  return (
    <div className="add-subject">
      <h2>Thêm môn thi mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm môn thi thành công!</p>
        </div>
      )}

      <form>
        <input type="text" name="title" placeholder="Tên môn thi" />
        <input type="text" name="description" placeholder="Mô tả" />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
