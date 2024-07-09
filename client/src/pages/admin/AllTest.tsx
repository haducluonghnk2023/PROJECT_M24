import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchTest } from "../../service/course.servce";
import "../../styles/allSubject.scss";
import { deleteTest, updateTest } from "../../store/reducers/subjectReducer";

export default function AllTest() {
  const dispatch: AppDispatch = useDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const test = useSelector((state: RootState) => state.test.test);
  const [currentTest, setCurrentTest] = useState<any>({
    id: "",
    title: "",
    description: "",
    duration: "",
  });
  // console.log(test);

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);

  const handleEdit = (test: any) => {
    // console.log("edit");
    setEditMode(true);
    setCurrentTest(test);
  };

  const handleDelete = async (testId: string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa khóa học này?");
    if (confirmDelete) {
      try {
        const response = await dispatch(deleteTest(testId));
        console.log("Xóa thành công:", response);
      } catch (error) {
        console.error("Xóa không thành công:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentTest({
      ...currentTest,
      [name]: value,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateTest(currentTest));
      console.log("Cập nhật thành công:", response);
      setEditMode(false);
      setCurrentTest({ id: "", title: "", description: "", duration: "" });
    } catch (error) {
      console.error("Cập nhật không thành công:", error);
    }
  };

  return (
    <div className="table-container">
      <input className="int" type="text" placeholder="Nhập tên cần tìm kiếm" />
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
                <button onClick={handleEdit} className="btn-edit">
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
          <form onChange={handleUpdate}>
            <input
              onChange={handleInputChange}
              value={currentTest.title}
              type="text"
              name="title"
              placeholder="Tên đề thi"
            />
            <input
              onChange={handleInputChange}
              value={currentTest.description}
              type="text"
              name="description"
              placeholder="Mô tả"
            />
            <input
              type="text"
              placeholder="Thời gian (phút) "
              onChange={handleInputChange}
            />
            <button type="submit">Cập nhật</button>
            <button onClick={() => setEditMode(false)}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
}
