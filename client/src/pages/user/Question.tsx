import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/user/question.scss";

export default function Question() {
  const { questionId } = useParams<{ questionId: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const questionsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    const storedTimeLeft = localStorage.getItem("timeLeft");

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      fetchQuestions();
    }

    if (storedTimeLeft) {
      setTimeLeft(parseInt(storedTimeLeft));
    } else {
      fetchTestDetails();
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const filtered = questions.filter(
        (question: any) => question.testId === parseInt(questionId!)
      );
      setFilteredQuestions(filtered);
    }
  }, [questions, questionId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      localStorage.setItem("timeLeft", timeLeft.toString());

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/questions");
      setQuestions(response.data);
      // localStorage.setItem("questions", JSON.stringify(response.data));
      console.log(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu câu hỏi:", error);
    }
  };

  const fetchTestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/test/${questionId}`
      );
      const durationInSeconds = response.data.duration * 60;
      setTimeLeft(durationInSeconds);
      setTotalTime(durationInSeconds);
      localStorage.setItem("timeLeft", durationInSeconds.toString());
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài thi:", error);
    }
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    const userEmail = JSON.parse(localStorage.getItem("loggedInUser")!).email;

    console.log(userEmail);

    let score = 0;
    filteredQuestions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        score += 1;
      }
    });

    const timeSpent = totalTime - timeLeft; // Thời gian đã dùng làm bài

    const examHistory = {
      userEmail: userEmail,
      testId: parseInt(questionId!),
      score: score,
      totalQuestions: filteredQuestions.length,
      timeTaken: Math.ceil(timeSpent / 60), // Thời gian làm bài tính bằng phút
    };

    try {
      await axios.post("http://localhost:8080/useranswer", examHistory);
      alert(
        `Bài thi đã được nộp! Số câu làm đúng của bạn: ${score}/${filteredQuestions.length}`
      );
      localStorage.removeItem("timeLeft");
      navigate("/user");
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử thi:", error);
      alert("Đã xảy ra lỗi khi lưu lịch sử thi. Vui lòng thử lại.");
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Lấy các câu hỏi của trang hiện tại
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  return (
    <div className="questions-page">
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
      <div className="timer">Thời gian còn lại: {formatTime(timeLeft)}</div>
      <div className="questions-list">
        {currentQuestions.map((question, index) => (
          <div key={question.id} className="question-item">
            <h2>
              Câu hỏi: {index + 1 + indexOfFirstQuestion} {question.question}
            </h2>
            <div className="options">
              {question.option.map((opt: string, index: number) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={opt}
                    onChange={() => handleAnswerChange(question.id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredQuestions.length / questionsPerPage),
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
      <button className="submit-btn" onClick={handleSubmit}>
        Nộp bài
      </button>
    </div>
  );
}
