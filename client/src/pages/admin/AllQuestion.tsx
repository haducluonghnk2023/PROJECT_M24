import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "../../styles/allSubject.scss";
import { fetchQuestion } from "../../service/course.servce";

export default function AllSubject() {
  const dispatch: AppDispatch = useDispatch();
  const question = useSelector((state: RootState) => state.question.question);
  // console.log(question);

  useEffect(() => {
    dispatch(fetchQuestion());
  }, [dispatch]);

  return (
    <div className="table-container">
      <input className="int" type="text" placeholder="Nhập tên cần tìm kiếm" />
      <table className="subject-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Đáp án</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {question.map((item: any) => (
            <tr key={item.id}>
              <td>{item.question}</td>
              <td>{item.answer}</td>
              <td>
                <button className="btn-edit">Sửa</button>
                <button className="btn-delete">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
