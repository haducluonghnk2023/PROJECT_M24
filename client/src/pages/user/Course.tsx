import { useDispatch } from "react-redux";
import "../../styles/user/course.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTestId } from "../../service/course.servce";
import axios from "axios";

export default function Course() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams<{ courseId: string }>();
  const [examSubjects, setExamSubjects] = useState<any[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage] = useState(4);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch dữ liệu môn thi khi component được mount
  useEffect(() => {
    fetchExamSubjects();
  }, []);

  // Lọc môn thi khi dữ liệu môn thi, courseId hoặc từ khóa tìm kiếm thay đổi
  useEffect(() => {
    filterSubjects();
  }, [examSubjects, courseId, searchKeyword]);

  // Hàm lấy dữ liệu môn thi từ server và lưu vào state
  const fetchExamSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/examSubject");
      setExamSubjects(response.data);
      localStorage.setItem("examSubjects", JSON.stringify(response.data));
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Hàm tìm kiếm môn thi theo từ khóa
  const searchExamSubjects = async (keyword: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/examSubject?title_like=${keyword}`
      );
      setExamSubjects(response.data);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  // Xử lý sự kiện khi người dùng nhập từ khóa tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    if (keyword.trim() === "") {
      fetchExamSubjects(); // Lấy lại toàn bộ dữ liệu khi không có từ khóa
    } else {
      searchExamSubjects(keyword);
    }
  };

  // Hàm lọc môn thi theo courseId và từ khóa tìm kiếm
  const filterSubjects = () => {
    if (examSubjects.length > 0) {
      const filtered = examSubjects.filter(
        (subject: any) =>
          subject.courseId === parseInt(courseId!) &&
          subject.title.includes(searchKeyword)
      );
      setFilteredSubjects(filtered);
    }
  };

  // Hàm xử lý khi người dùng muốn tham gia môn thi
  const handleJoinExam = (subjectId: number) => {
    dispatch(getTestId(subjectId));
    navigate(`/test/${subjectId}`);
  };

  // Phân trang
  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = filteredSubjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );

  // Chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Thi online miễn phí</h1>
          <ul className="nav-links">
            <li>
              <Link to="/user">Trang chủ</Link>
            </li>
            <li>
              <Link to="/user/content">Các khóa thi</Link>
            </li>
            <li>
              <Link to="/faq">Hỏi đáp</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="course-detail">
        <input
          type="text"
          placeholder="Tìm kiếm môn thi..."
          value={searchKeyword}
          onChange={handleSearch}
        />{" "}
        {currentSubjects.length > 0 ? (
          currentSubjects.map((item: any) => (
            <div key={item.id} className="course-section">
              <h2>{item.title}</h2>
              <button className="btn" onClick={() => handleJoinExam(item.id)}>
                Tham gia môn thi
              </button>
            </div>
          ))
        ) : (
          <p>Không tìm thấy môn thi nào</p>
        )}
        <div className="pagination">
          {Array.from({
            length: Math.ceil(filteredSubjects.length / subjectsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={index + 1 === currentPage ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
