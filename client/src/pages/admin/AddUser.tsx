import { useDispatch } from "react-redux";
import { useState } from "react";

import "../styles/addUser.css";

export default function AddUser() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="add-user">
      <h2>Thêm người dùng mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm người dùng thành công!</p>
        </div>
      )}

      <form>
        <input type="text" name="name" placeholder="Tên" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Mật khẩu" />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
