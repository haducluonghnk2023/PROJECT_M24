import { useEffect } from "react";
import "../../styles/allCourse.scss";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCourses } from "../../service/course.servce";
import { deleteCourse } from "../../store/reducers/courseReducer";

export default function AllExam() {
  const dispatch: AppDispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.courses.courses);
  // console.log(courses);

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

  const handleEdit = async () => {
    console.log("edit");
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
                <button onClick={() => handleEdit} className="btn-edit">
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
    </div>
  );
}
