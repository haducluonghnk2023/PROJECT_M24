import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "../../styles/allSubject.scss";
import {
  deleteQuestion,
  fetchQuestion,
  updateQuestion,
} from "../../service/course.servce";

export default function AllSubject() {
  const dispatch: AppDispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.question.questions);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>({
    id: "",
    question: "",
    answer: "",
  });
  const [formErrors, setFormErrors] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    dispatch(fetchQuestion());
  }, [dispatch]);

  const handleEdit = (question: any) => {
    setEditMode(true);
    setCurrentQuestion(question);
  };

  const handleDelete = async (questionId: string) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa câu hỏi này?");
    if (confirmDelete) {
      try {
        const response = await dispatch(deleteQuestion(questionId));
        dispatch(fetchQuestion());
        console.log("Xóa thành công:", response);
      } catch (error) {
        console.error("Xóa không thành công:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentQuestion({
      ...currentQuestion,
      [name]: value,
    });
  };

  const validate = () => {
    const errors: any = {};
    if (!currentQuestion.question.trim()) {
      errors.question = "Vui lòng nhập câu hỏi";
    }
    if (!currentQuestion.answer.trim()) {
      errors.answer = "Vui lòng nhập đáp án câu hỏi";
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
      const response = await dispatch(updateQuestion(currentQuestion));
      console.log("Cập nhật thành công:", response);
      setEditMode(false);
      setCurrentQuestion({ id: "", question: "", answer: "" });
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
            <th>Đáp án</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {questions && questions.length > 0 ? (
            questions.map((item: any) => (
              <tr key={item.id}>
                <td>{item.question}</td>
                <td>{item.answer}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan={3}>Không có câu hỏi nào.</td>
            </tr>
          )}
        </tbody>
      </table>
      {editMode && (
        <div className="edit-form">
          <h3>Sửa thông tin câu hỏi</h3>
          <form onSubmit={handleUpdate}>
            <input
              onChange={handleInputChange}
              value={currentQuestion.question}
              type="text"
              name="question"
              placeholder="Câu hỏi"
            />

            <input
              onChange={handleInputChange}
              value={currentQuestion.answer}
              type="text"
              name="answer"
              placeholder="Đáp án"
            />

            <button type="submit">Cập nhật</button>
            <button onClick={() => setEditMode(false)}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
}
