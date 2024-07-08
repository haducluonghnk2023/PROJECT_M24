import { useState } from "react";
import { useDispatch } from "react-redux";

import "../../styles/addCourse.scss";
import { addCourse } from "../../store/reducers/courseReducer";

export default function AddCourses() {
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors: any = {};
    if (!formData.title) {
      errors.title = "Tên khóa thi là bắt buộc";
    }
    if (!formData.description) {
      errors.description = "Mô tả là bắt buộc";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      try {
        await dispatch(addCourse(formData)).unwrap();
        setShowSuccessMessage(true);
        setFormData({
          title: "",
          description: "",
        });
      } catch (error) {
        console.error("Failed to add course: ", error);
      }
    }
  };

  return (
    <div className="add-courses">
      <h2>Thêm khóa thi mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm khóa thi thành công!</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Tên khóa thi"
            value={formData.title}
            onChange={handleChange}
          />
          {formErrors.title && <p className="error">{formErrors.title}</p>}
        </div>
        <div>
          <input
            type="text"
            name="description"
            placeholder="Mô tả"
            value={formData.description}
            onChange={handleChange}
          />
          {formErrors.description && (
            <p className="error">{formErrors.description}</p>
          )}
        </div>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
