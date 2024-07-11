import { useState } from "react";
import "../../styles/admin/addSubject.scss";
import { useDispatch } from "react-redux";
import { addSubject } from "../../service/course.servce";

interface FormData {
  title: string;
  description: string;
}
const AddSubject = () => {
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

  const validate = () => {
    const errors: any = {};
    if (!formData.title.trim()) {
      errors.title = "Vui lòng nhập tên môn học";
    }
    if (!formData.description.trim()) {
      errors.description = "Vui lòng nhập mô tả môn học";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    dispatch(addSubject(formData))
      .then(() => {
        setShowSuccessMessage(true);
        setFormData({ title: "", description: "" });
        setFormErrors({ title: "", description: "" });
      })
      .catch((err: any) => {
        console.error("Thêm môn học không thành công:", err);
      });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name as keyof FormData]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  return (
    <div className="add-subject">
      <h2>Thêm môn học mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm môn học thành công!</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Tên môn học"
        />
        {formErrors.title && (
          <p className="error-message">{formErrors.title}</p>
        )}
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Mô tả"
        />
        {formErrors.description && (
          <p className="error-message">{formErrors.description}</p>
        )}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddSubject;
