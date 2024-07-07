import React, { useState } from "react";
import "../../styles/addQuestion.css";
export default function AddQuestion() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  return (
    <div className="add-question">
      <h2>Thêm câu hỏi mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm câu hỏi thành công!</p>
        </div>
      )}

      <form>
        <input type="text" name="title" placeholder="Câu hỏi cần thêm" />
        <input type="text" name="option" placeholder="Đáp án" />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
