import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { deleteTest, fetchTest, updateTest } from "../../service/course.servce";
import "../../styles/admin/allSubject.scss";
import { confirmDelete, showSuccess, showError } from "../../utils/confirmDialog";

export default function AllTest() {
  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [searchTest, setSearchTest] = useState("");
  const test = useSelector((state: RootState) => state.test.test);
  const [currentTest, setCurrentTest] = useState<any>({
    id: "",
    title: "",
    description: "",
    duration: "",
  });
  // console.log(test);

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    duration: "",
  });

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  const handleEdit = (test: any) => {
    setEditMode(true);
    setCurrentTest(test);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentTest({
      ...currentTest,
      [name]: name === "duration" ? Number(value) : value,
    });
  };

  //validate dữ liệu trong form
  const validate = () => {
    const errors: any = {};
    if (!currentTest.title.trim()) {
      errors.title = "Vui lòng nhập tên khóa học";
    }
    if (!currentTest.description.trim()) {
      errors.description = "Vui lòng nhập mô tả khóa học";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // hàm cập nhật đề thi
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const response = await dispatch(updateTest(currentTest));
      console.log("Cập nhật thành công:", response);
      setEditMode(false);
      setCurrentTest({ id: "", title: "", description: "", duration: "" });
    } catch (error) {
      console.error("Cập nhật không thành công:", error);
    }
  };

  //hàm xóa đề thi
  const handleDelete = async (testId: string) => {
    const confirmed = await confirmDelete("đề thi này");
    if (!confirmed) return;

    try {
      const response = await dispatch(deleteTest(testId));
      if (response.meta.requestStatus === "fulfilled") {
        showSuccess("Xóa thành công", "Đã xóa đề thi thành công!");
        dispatch(fetchTest());
      }
    } catch (error) {
      console.error("Xóa không thành công:", error);
      showError("Lỗi xóa đề thi", "Có lỗi xảy ra khi xóa đề thi!");
    }
  };

  const clearSearch = () => {
    setSearchTest("");
  };

  // Reset search when test changes
  useEffect(() => {
    if (searchTest && test.length === 0) {
      setSearchTest("");
    }
  }, [test, searchTest]);

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          value={searchTest}
          onChange={(e) => setSearchTest(e.target.value)}
          className="int"
          type="text"
          placeholder="Nhập tên đề thi cần tìm kiếm"
        />
        {searchTest && (
          <button onClick={clearSearch} className="clear-search-btn">
            ✕
          </button>
        )}
      </div>
      <table className="subject-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {test.map((item: any) => (
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
          <h3>Sửa thông tin đề thi</h3>
          <form onSubmit={handleUpdate}>
            <input
              onChange={handleInputChange}
              value={currentTest.title}
              type="text"
              name="title"
              placeholder="Tên đề thi"
            />
            {formErrors.title && <p className="error">{formErrors.title}</p>}
            <input
              onChange={handleInputChange}
              value={currentTest.description}
              type="text"
              name="description"
              placeholder="Mô tả"
            />
            {formErrors.description && (
              <p className="error">{formErrors.description}</p>
            )}
            <input
              type="text"
              name="duration"
              placeholder="Thời gian (phút) "
              value={currentTest.duration}
              onChange={handleInputChange}
            />
            {formErrors.duration && (
              <p className="error">{formErrors.duration}</p>
            )}
            <button type="submit">Cập nhật</button>
            <button onClick={() => setEditMode(false)}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
}
