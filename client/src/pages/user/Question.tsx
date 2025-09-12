import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/user/question.scss";
import { Button } from "../../components/common/Button";
import { confirmExit, confirmSubmit, showSuccess, showError } from "../../utils/confirmDialog";

interface Question {
  id: number;
  question: string;
  option: string[];
  answer: string;
  testId: number;
}

export default function Question() {
  const { questionId } = useParams<{ questionId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const questionsPerPage = 1; // Hiển thị 1 câu hỏi mỗi trang
  const navigate = useNavigate();

  useEffect(() => {
    const initializeExam = async () => {
      setLoading(true);
      try {
        const storedQuestions = localStorage.getItem("questions");
        const storedTimeLeft = localStorage.getItem("timeLeft");
        const storedAnswers = localStorage.getItem(`exam_answers_${questionId}`);

        if (storedQuestions) {
          setQuestions(JSON.parse(storedQuestions));
        } else {
          await fetchQuestions();
        }

        if (storedTimeLeft) {
          setTimeLeft(parseInt(storedTimeLeft));
        } else {
          await fetchTestDetails();
        }

        // Khôi phục câu trả lời đã lưu
        if (storedAnswers) {
          setAnswers(JSON.parse(storedAnswers));
        }

        // Lưu thời gian bắt đầu
        setStartTime(Date.now());
      } catch (error) {
        console.error("Lỗi khởi tạo bài thi:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeExam();
  }, [questionId]);

  useEffect(() => {
    if (questions.length > 0) {
      const filtered = questions.filter(
        (question: any) => question.testId === parseInt(questionId!)
      );
      setFilteredQuestions(filtered);
    }
  }, [questions, questionId]);

  // Confirm before leaving the page
  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      
      const confirmed = await confirmExit();
      if (!confirmed) {
        e.preventDefault();
        return false;
      }
    };

    const handlePopState = async () => {
      const confirmed = await confirmExit();
      if (!confirmed) {
        window.history.pushState(null, '', window.location.href);
        return;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Tự động lưu câu trả lời khi có thay đổi
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(`exam_answers_${questionId}`, JSON.stringify(answers));
    }
  }, [answers, questionId]);

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
      setStartTime(Date.now());
      localStorage.setItem("timeLeft", durationInSeconds.toString());
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài thi:", error);
    }
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer,
    };
    setAnswers(newAnswers);
    
    // Lưu câu trả lời vào localStorage
    localStorage.setItem(`exam_answers_${questionId}`, JSON.stringify(newAnswers));
    
    // Hiển thị thông báo lưu
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    const confirmed = await confirmSubmit();
    if (!confirmed) return;
    
    setIsSubmitting(true);
    
    try {
      const userEmail = JSON.parse(localStorage.getItem("loggedInUser")!).email;

      let score = 0;
      filteredQuestions.forEach((question) => {
        if (answers[question.id] === question.answer) {
          score += 1;
        }
      });

      // Tính thời gian làm bài chính xác
      let timeSpentMinutes = 0;
      
      if (startTime > 0) {
        // Sử dụng thời gian thực tế từ khi bắt đầu
        const currentTime = Date.now();
        const timeSpentMs = currentTime - startTime;
        timeSpentMinutes = Math.max(0, Math.ceil(timeSpentMs / (1000 * 60)));
      } else if (totalTime > 0) {
        // Fallback: sử dụng timer
        const timeSpent = totalTime - timeLeft;
        timeSpentMinutes = Math.max(0, Math.ceil(timeSpent / 60));
      }

      const examHistory = {
        userEmail: userEmail,
        testId: parseInt(questionId!),
        score: score,
        totalQuestions: filteredQuestions.length,
        timeTaken: timeSpentMinutes, // Thời gian làm bài tính bằng phút
      };

      await axios.post("http://localhost:8080/useranswer", examHistory);
      
      // Hiển thị kết quả đẹp hơn
      const percentage = Math.round((score / filteredQuestions.length) * 100);
      const resultMessage = `🎉 Bài thi đã được nộp!\n\n📊 Kết quả: ${score}/${filteredQuestions.length} câu đúng (${percentage}%)\n⏱️ Thời gian làm bài: ${timeSpentMinutes} phút`;
      
      // Debug log
      console.log('Debug thời gian:', {
        startTime,
        currentTime: Date.now(),
        totalTime,
        timeLeft,
        timeSpentMinutes
      });
      
      showSuccess("Nộp bài thành công!", resultMessage);
      localStorage.removeItem("timeLeft");
      localStorage.removeItem(`exam_answers_${questionId}`);
      
      setTimeout(() => {
        navigate("/user");
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử thi:", error);
      showError("Lỗi nộp bài", "Đã xảy ra lỗi khi lưu lịch sử thi. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
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

  if (loading) {
    return (
      <div className="questions-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Đang tải câu hỏi...</p>
        </div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="questions-page">
        <div className="no-questions">
          <div className="no-questions-icon">❓</div>
          <h3>Không có câu hỏi nào</h3>
          <p>Đề thi này chưa có câu hỏi nào. Vui lòng quay lại sau.</p>
          <Button onClick={() => navigate("/user")} className="btn-back">
            Quay lại trang chủ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="questions-page">
      <div className="exam-header">
        <div className="exam-info">
          <h1>Bài thi trực tuyến</h1>
          <p>Câu hỏi {currentPage} / {Math.ceil(filteredQuestions.length / questionsPerPage)}</p>
        </div>
        <div className="timer-container">
          <div className="timer">
            <span className="timer-icon">⏰</span>
            <span className="timer-text">Thời gian còn lại: {formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {showSaveMessage && (
        <div className="save-message">
          <span className="save-icon">💾</span>
          <span>Câu trả lời đã được lưu tự động</span>
        </div>
      )}

      <div className="exam-content">
        <div className="question-container">
          {currentQuestions.map((question, index) => (
            <div key={question.id} className={`question-card ${answers[question.id] ? 'answered' : ''}`}>
              <div className="question-header">
                <h2 className="question-title">
                  Câu {index + 1 + indexOfFirstQuestion}
                  {answers[question.id] && <span className="answered-badge">✓ Đã trả lời</span>}
                </h2>
                <div className="question-number">
                  {currentPage} / {Math.ceil(filteredQuestions.length / questionsPerPage)}
                </div>
              </div>
              
              <div className="question-content">
                <p className="question-text">{question.question}</p>
                
                <div className="options-container">
                  {question.option.map((opt: string, optIndex: number) => (
                    <label key={optIndex} className="option-item">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={opt}
                        checked={answers[question.id] === opt}
                        onChange={() => handleAnswerChange(question.id, opt)}
                        className="option-input"
                      />
                      <span className="option-text">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="exam-controls">
          <div className="pagination">
            {Array.from({
              length: Math.ceil(filteredQuestions.length / questionsPerPage),
            }).map((_, index) => {
              const questionIndex = index * questionsPerPage;
              const question = filteredQuestions[questionIndex];
              const isAnswered = question && answers[question.id];
              const isCurrentPage = index + 1 === currentPage;
              
              return (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`pagination-btn ${isCurrentPage ? "active" : ""} ${isAnswered ? "answered" : ""}`}
                  title={isAnswered ? "Đã trả lời" : "Chưa trả lời"}
                >
                  {index + 1}
                  {isAnswered && <span className="answered-icon">✓</span>}
                </button>
              );
            })}
          </div>

          <div className="submit-section">
            <div className="progress-info">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${(Object.keys(answers).length / filteredQuestions.length) * 100}%` 
                  }}
                ></div>
              </div>
              <span>Đã trả lời: {Object.keys(answers).length} / {filteredQuestions.length} câu</span>
            </div>
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? "Đang nộp bài..." : "Nộp bài"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
