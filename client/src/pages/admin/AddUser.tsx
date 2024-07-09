import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import bcrypt from "bcryptjs";
import "../../styles/addUser.scss";
import { addUser } from "../../service/course.servce";

export default function AddUser() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: 0,
    status: 1,
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.addUser);

  const validate = () => {
    let errors = { username: "", email: "", password: "" };
    let isValid = true;

    if (!formData.username) {
      errors.username = "Tên không được để trống";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Email không hợp lệ";
      isValid = false;
    }

    if (formData.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

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
          status: 1,
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
        {formErrors.username && (
          <div className="error-message">
            <p>{formErrors.username}</p>
          </div>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && (
          <div className="error-message">
            <p>{formErrors.email}</p>
          </div>
        )}
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
        {formErrors.password && (
          <div className="error-message">
            <p>{formErrors.password}</p>
          </div>
        )}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
