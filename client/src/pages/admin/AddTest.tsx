import React, { useState } from "react";
import "../../styles/admin/addTest.scss";
import { useDispatch } from "react-redux";
import { addTest } from "../../service/course.servce";
interface FormData {
  title: string;
  description: string;
  duration: number;
}
export default function AddTest() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const validate = () => {
    const errors: any = {};
    if (!formData.title.trim()) {
      errors.title = "Vui lòng nhập tên đề thi ";
    }
    if (!formData.description.trim()) {
      errors.description = "Vui lòng nhập mô tả đề thi";
    }
    if (!formData.duration) {
      errors.duration = "Vui lòng nhập thời gian thi";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    dispatch(addTest(formData))
      .then(() => {
        setShowSuccessMessage(true);
        setFormData({ title: "", description: "", duration: "" });
        setFormErrors({ title: "", description: "", duration: "" });
      })
      .catch((err: any) => {
        console.error("Thêm đề thi không thành công:", err);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "duration" ? Number(value) : value,
    });

    if (formErrors[name as keyof FormData]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  return (
    <div className="add-test">
      <h2>Thêm đề thi mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm đề thi thành công!</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          value={formData.title}
          type="text"
          name="title"
          placeholder="Tên đề thi"
        />
        {formErrors.title && (
          <p className="error-message">{formErrors.title}</p>
        )}
        <input
          onChange={handleInputChange}
          value={formData.description}
          type="text"
          name="description"
          placeholder="Mô tả"
        />
        {formErrors.description && (
          <p className="error-message">{formErrors.description}</p>
        )}
        <input
          onChange={handleInputChange}
          value={formData.duration}
          type="text"
          name="duration"
          placeholder="Thời gian (phút)"
        />
        {formErrors.duration && (
          <p className="error-message">{formErrors.duration}</p>
        )}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
