import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCourses } from "../../service/course.servce";
import { deleteCourse, updateCourse } from "../../store/reducers/courseReducer";
import "../../styles/allCourse.scss";
import "../../styles/courseReducer.scss";

export default function AllExam() {
  const dispatch: AppDispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.courses.courses);
  const [editMode, setEditMode] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>({
    id: "",
    title: "",
    description: "",
  });
  // console.log(courses);
  // console.log(currentCourse);

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = async (courseId: string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa khóa học này?");
    if (confirmDelete) {
      try {
        const response = await dispatch(deleteCourse(courseId));
        console.log("Xóa thành công:", response);
      } catch (error) {
        console.error("Xóa không thành công:", error);
      }
    }
  };

  const handleEdit = (course: any) => {
    setEditMode(true);
    setCurrentCourse(course);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCourse({
      ...currentCourse,
      [name]: value,
    });
  };

  const validate = () => {
    const errors: any = {};
    if (!currentCourse.title.trim()) {
      errors.title = "Vui lòng nhập tên khóa học";
    }
    if (!currentCourse.description.trim()) {
      errors.description = "Vui lòng nhập mô tả khóa học";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await dispatch(updateCourse(currentCourse));
      console.log("Cập nhật thành công:", response);
      setEditMode(false);
      setCurrentCourse({ id: "", title: "", description: "" });
    } catch (error) {
      console.error("Cập nhật không thành công:", error);
    }
  };
  return (
    <div className="table-container">
      <input className="int" type="text" placeholder="Nhập tên cần tìm kiếm" />
      <table className="courses-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course: any) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.description}</td>

              <td>
                <button onClick={() => handleEdit(course)} className="btn-edit">
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="btn-delete"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editMode && (
        <div className="edit-form">
          <h3>Sửa thông tin khóa học</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="title"
              value={currentCourse.title}
              onChange={handleInputChange}
              placeholder="Tên khóa học"
            />
            {formErrors.title && (
              <p className="error-message">{formErrors.title}</p>
            )}
            <input
              type="text"
              name="description"
              value={currentCourse.description}
              onChange={handleInputChange}
              placeholder="Mô tả"
            />
            {formErrors.description && (
              <p className="error-message">{formErrors.description}</p>
            )}
            <button type="submit">Cập nhật</button>
            <button onClick={() => setEditMode(false)}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
}
