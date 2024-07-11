import { useState, useEffect } from "react";
import "../../styles/admin/addSubject.scss";
import { useDispatch } from "react-redux";
import { addSubject, fetchExamSubject } from "../../service/course.servce";

interface CourseData {
  id: number;
  title: string;
}

interface FormData {
  title: string;
  description: string;
  courseId: number;
}

const AddSubject = () => {
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    courseId: 0,
  });

  useEffect(() => {
    dispatch(fetchExamSubject());
  }, [dispatch]);
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    courseId: "",
  });

  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // Gọi API để lấy danh sách khóa thi
      const response = await fetch("http://localhost:8080/courses");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu khóa thi");
      }
      const data = await response.json();
      setCourses(data); // Cập nhật danh sách khóa thi vào state
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const validate = () => {
    const errors: any = {};
    if (!formData.title.trim()) {
      errors.title = "Vui lòng nhập tên môn học";
    }
    if (!formData.description.trim()) {
      errors.description = "Vui lòng nhập mô tả môn học";
    }
    if (!formData.courseId) {
      errors.courseId = "Vui lòng chọn khóa thi";
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
        setFormData({ title: "", description: "", courseId: 0 });
        setFormErrors({ title: "", description: "", courseId: "" });
      })
      .catch((err: any) => {
        console.error("Thêm môn học không thành công:", err);
      });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "courseId") {
      // Chuyển đổi value sang số
      setFormData({
        ...formData,
        [name]: parseInt(value, 10),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

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
        <select
          name="courseId"
          value={formData.courseId}
          onChange={handleInputChange}
        >
          <option value="">Chọn khóa thi</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        {formErrors.courseId && (
          <p className="error-message">{formErrors.courseId}</p>
        )}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddSubject;
