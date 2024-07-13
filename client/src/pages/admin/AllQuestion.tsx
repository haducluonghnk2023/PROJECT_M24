import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import ReactPaginate from "react-paginate";
import "../../styles/admin/allSubject.scss";
import {
  deleteQuestion,
  fetchQuestion,
  updateQuestion,
} from "../../service/course.servce";

export default function AllSubject() {
  const dispatch: AppDispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.question.questions);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;

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

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  // Lấy dữ liệu câu hỏi hiện tại dựa trên trang hiện tại và số câu hỏi mỗi trang
  const offset = currentPage * questionsPerPage;
  const currentPageQuestions = questions.slice(
    offset,
    offset + questionsPerPage
  );

  return (
    <div className="table-container">
      <table className="subject-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Đáp án</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {currentPageQuestions && currentPageQuestions.length > 0 ? (
            currentPageQuestions.map((item: any) => (
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
      <ReactPaginate
        previousLabel={"Trước"}
        nextLabel={"Sau"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(questions.length / questionsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
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
            {formErrors.question && (
              <p className="error-message">{formErrors.question}</p>
            )}

            <input
              onChange={handleInputChange}
              value={currentQuestion.answer}
              type="text"
              name="answer"
              placeholder="Đáp án"
            />
            {formErrors.answer && (
              <p className="error-message">{formErrors.answer}</p>
            )}

            <button type="submit">Cập nhật</button>
            <button onClick={() => setEditMode(false)}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
}
