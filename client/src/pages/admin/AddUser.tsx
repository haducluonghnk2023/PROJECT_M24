import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import bcrypt from "bcryptjs";
import "../../styles/addUser.css";
import { addUser } from "../../store/reducers/addUserReducer";

export default function AddUser() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: 0,
    status: 0,
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.addUser);
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    const dataToSubmit = {
      ...formData,
      password: hashedPassword,
      repassword: hashedPassword,
    };

    dispatch(addUser(dataToSubmit)).then((response: any) => {
      if (response.type === "addUser/addUser/fulfilled") {
        setShowSuccessMessage(true);
        setFormData({
          username: "",
          email: "",
          password: "",
          role: 0,
          status: 0,
        });
        setTimeout(() => setShowSuccessMessage(false), 2000);
      }
    });
  };

  return (
    <div className="add-user">
      <h2>Thêm người dùng mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm người dùng thành công!</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Tên"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
    </div>
  );
}
