import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  deleteSubject,
  fetchExamSubject,
  updateSubject,
} from "../../service/course.servce";
import "../../styles/allSubject.scss";

export default function AllSubject() {
  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<any>({
    id: "",
    title: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
  });
  const subject = useSelector(
    (state: RootState) => state.addSubject.examSubject
  );
  // console.log(subject);
  // console.log(currentSubject);

  useEffect(() => {
    dispatch(fetchExamSubject());
  }, [dispatch]);

  const handleEdit = (subject: any) => {
    // console.log("edit");
    setEditMode(true);
    setCurrentSubject(subject);
  };

  const handleDelete = async (subjectId: string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa khóa học này?");
    if (confirmDelete) {
      try {
        const response = await dispatch(deleteSubject(subjectId));
        console.log("Xóa thành công:", response);
      } catch (error) {
        console.error("Xóa không thành công:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentSubject({
      ...currentSubject,
      [name]: value,
    });
  };

  const validate = () => {
    const errors: any = {};
    if (!currentSubject.title.trim()) {
      errors.title = "Vui lòng nhập tên khóa học";
    }
    if (!currentSubject.description.trim()) {
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
      const response = await dispatch(updateSubject(currentSubject));
      console.log("Cập nhật thành công:", response);
      setEditMode(false);
      setCurrentSubject({ id: "", title: "", description: "" });
    } catch (error) {
      console.error("Cập nhật không thành công:", error);
    }
  };

  return (
    <div className="table-container">
      <table className="subject-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {subject.map((item: any) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleEdit(item)} className="btn-edit">
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
              onChange={handleInputChange}
              value={currentSubject.title}
              type="text"
              name="title"
              placeholder="Tên khóa học"
            />
            {formErrors.title && (
              <p className="error-message">{formErrors.title}</p>
            )}

            <input
              onChange={handleInputChange}
              value={currentSubject.description}
              type="text"
              name="description"
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
