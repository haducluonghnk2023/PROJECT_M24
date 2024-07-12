import { useDispatch } from "react-redux";
import "../../styles/user/course.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTestId } from "../../service/course.servce";

export default function Course() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams<{ courseId: string }>();
  const [examSubjects, setExamSubjects] = useState<any[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<any[]>([]);

  useEffect(() => {
    fetchExamSubjects();
  }, []);

  useEffect(() => {
    if (examSubjects.length > 0) {
      const filtered = examSubjects.filter(
        (subject: any) => subject.courseId === parseInt(courseId!)
      );
      setFilteredSubjects(filtered);
    }
  }, [examSubjects, courseId]);

  const fetchExamSubjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/examSubject");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu môn thi");
      }
      const data = await response.json();
      setExamSubjects(data);
      // Lưu trữ dữ liệu vào localStorage
      localStorage.setItem("examSubjects", JSON.stringify(data));
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleJoinExam = (subjectId: number) => {
    // console.log(subjectId);
    dispatch(getTestId(subjectId));
    navigate(`/test/${subjectId}`);
  };

  console.log(examSubjects);

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
        {filteredSubjects.map((item: any) => (
          <div key={item.id} className="course-section">
            <h2>{item.title}</h2>
            <button className="btn" onClick={() => handleJoinExam(item.id)}>
              Tham gia môn thi
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
