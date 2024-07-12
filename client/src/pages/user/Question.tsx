import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/user/question.scss";

export default function Question() {
  const { questionId } = useParams<{ questionId: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
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
      console.log(filtered);

      setFilteredQuestions(filtered);
      console.log(questions);
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
      const response = await fetch("http://localhost:8080/questions");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu môn thi");
      }
      const data = await response.json();
      setQuestions(data);
      localStorage.setItem("questions", JSON.stringify(data));
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const fetchTestDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/test/${questionId}`);
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu bài thi");
      }
      const data = await response.json();
      const durationInSeconds = data.duration * 60;
      setTimeLeft(durationInSeconds);
      setTotalTime(durationInSeconds);
      localStorage.setItem("timeLeft", durationInSeconds.toString());
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    console.log(totalTime);
    let score = 0;
    filteredQuestions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        score += 1;
      }
    });

    const timeSpent = totalTime - timeLeft; // Thời gian đã dùng làm bài

    const examHistory = {
      questionId: questionId,
      score: score,
      totalQuestions: filteredQuestions.length,
      timeTaken: timeSpent,
    };

    const storedHistory = JSON.parse(
      localStorage.getItem("examHistory") || "[]"
    );

    storedHistory.push(examHistory);

    localStorage.setItem("examHistory", JSON.stringify(storedHistory));
    localStorage.removeItem("timeLeft");

    alert(
      `Bài thi đã được nộp! Số câu làm đúng của bạn: ${score}/${filteredQuestions.length}`
    );
    navigate("/user");
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
        {filteredQuestions.map((question, index) => (
          <div key={question.id} className="question-item">
            <h2>
              Câu hỏi:{index + 1} {question.question}
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
      <button className="submit-btn" onClick={handleSubmit}>
        Nộp bài
      </button>
      {totalTime > 0 && (
        <div className="time-spent-info">
          Thời gian làm bài: {formatTime(totalTime - timeLeft)}
        </div>
      )}
    </div>
  );
}
