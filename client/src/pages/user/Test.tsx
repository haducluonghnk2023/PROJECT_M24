import { useDispatch } from "react-redux";
import "../../styles/user/course.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTestId } from "../../service/course.servce";

export default function Course() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { testId } = useParams<{ testId: string }>();
  const [tests, setTests] = useState<any[]>([]);
  const [filteredTests, setFilteredTests] = useState<any[]>([]);

  useEffect(() => {
    fetchExamSubjects();
  }, []);

  useEffect(() => {
    if (tests.length > 0) {
      const filtered = tests.filter(
        (subject: any) => subject.examSubjectId === parseInt(testId!)
      );
      setFilteredTests(filtered);
    }
  }, [tests, testId]);

  const fetchExamSubjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/test");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu môn thi");
      }
      const data = await response.json();
      setTests(data);
      // Lưu trữ dữ liệu vào localStorage
      localStorage.setItem("test", JSON.stringify(data));
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleJoinExam = (testId: number) => {
    // console.log(subjectId);
    dispatch(getTestId(testId));
    navigate(`/questions/${testId}`);
  };

  // console.log(tests);

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
              <Link to="/courses">Các khóa thi</Link>
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
        {filteredTests.map((item: any) => (
          <div key={item.id} className="course-section">
            <h2>{item.title}</h2>
            <button className="btn" onClick={() => handleJoinExam(item.id)}>
              Tham gia đề thi
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
