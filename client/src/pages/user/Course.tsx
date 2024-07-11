import { useDispatch, useSelector } from "react-redux";
import "../../styles/user/course.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchExamSubjectUser } from "../../service/course.servce";

export default function Course() {
  const navigate = useNavigate();
  const examSubject = useSelector((state: any) => state.examSubject.test);
  const state: any = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExamSubjectUser());
  }, []);
  //   console.log(examSubject);
  //   console.log(state.examSubject.id, 1232131312);

  const handleJoinExam = (subjectId: number) => {
    navigate(`/questions/${subjectId}`);
    // console.log(`/questions/${subjectId}`);
  };

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
        {examSubject.map((item: any) => {
          if (item.courseId === state.examSubject.id) {
            return (
              <div key={item.id} className="course-section">
                <h2>{item.title}</h2>
                <button className="btn" onClick={() => handleJoinExam(item.id)}>
                  Tham gia môn thi
                </button>
              </div>
            );
          }
        })}
      </main>
    </div>
  );
}
