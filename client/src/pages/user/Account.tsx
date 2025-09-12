import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/userAccount.scss";
import axios from "axios";
import { confirmDelete, showSuccess, showError } from "../../utils/confirmDialog";

export default function UserAccount() {
  const [userData, setUserData] = useState<any>(null);
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [examStats, setExamStats] = useState<any>({});
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: any = {};
    if (!updatedUserData.username) {
      newErrors.username = "Tên không được để trống";
    }
    if (!updatedUserData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(updatedUserData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validate()) {
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${userData.id}`,
        updatedUserData
      );
      if (response.status !== 200) {
        throw new Error("Lỗi cập nhật thông tin người dùng");
      }
      const updatedData = response.data;
      setUserData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const fetchUserAnswers = async (email: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/useranswer?userEmail=${email}`
      );
      setExamHistory(response.data);
      calculateExamStats(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const calculateExamStats = (history: any[]) => {
    const stats: any = {};
    
    history.forEach(exam => {
      const testId = exam.testId;
      if (!stats[testId]) {
        stats[testId] = {
          testId,
          attempts: 0,
          bestScore: 0,
          bestPercentage: 0,
          totalTime: 0,
          averageTime: 0,
          lastAttempt: null,
          firstAttempt: null,
          allAttempts: []
        };
      }
      
      const percentage = Math.round((exam.score / exam.totalQuestions) * 100);
      const attempt = {
        id: exam.id,
        score: exam.score,
        totalQuestions: exam.totalQuestions,
        percentage,
        timeTaken: exam.timeTaken,
        date: new Date(exam.createdAt || Date.now())
      };
      
      stats[testId].attempts++;
      stats[testId].allAttempts.push(attempt);
      
      if (percentage > stats[testId].bestPercentage) {
        stats[testId].bestScore = exam.score;
        stats[testId].bestPercentage = percentage;
      }
      
      stats[testId].totalTime += exam.timeTaken;
      stats[testId].averageTime = Math.round(stats[testId].totalTime / stats[testId].attempts);
      
      if (!stats[testId].lastAttempt || attempt.date > stats[testId].lastAttempt) {
        stats[testId].lastAttempt = attempt.date;
      }
      
      if (!stats[testId].firstAttempt || attempt.date < stats[testId].firstAttempt) {
        stats[testId].firstAttempt = attempt.date;
      }
    });
    
    // Sắp xếp attempts theo thời gian
    Object.values(stats).forEach((stat: any) => {
      stat.allAttempts.sort((a: any, b: any) => b.date - a.date);
    });
    
    setExamStats(stats);
  };

  const handleDeleteExam = async (examId: number) => {
    const confirmed = await confirmDelete("bài thi này");
    if (!confirmed) return;

    setDeletingId(examId);
    try {
      // Tìm ID của bài thi trong useranswer
      const examToDelete = examHistory.find(exam => exam.testId === examId);
      if (examToDelete) {
        await axios.delete(`http://localhost:8080/useranswer/${examToDelete.id}`);
        
        // Cập nhật danh sách local
        const updatedHistory = examHistory.filter(exam => exam.testId !== examId);
        setExamHistory(updatedHistory);
        calculateExamStats(updatedHistory);
        
        showSuccess("Xóa thành công", "Đã xóa bài thi khỏi lịch sử thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa bài thi:", error);
      showError("Lỗi xóa bài thi", "Có lỗi xảy ra khi xóa bài thi. Vui lòng thử lại.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    );

    if (loggedInUser) {
      setUserData(loggedInUser);
      setUpdatedUserData(loggedInUser);
      fetchUserAnswers(loggedInUser.email);
    }
  }, []);

  return (
    <div className="user-account">
      <button onClick={() => navigate("/user")}>Trang chủ</button>
      {userData && (
        <div className="account-info">
          <h2>Thông tin tài khoản</h2>
          {isEditing ? (
            <div>
              <label>
                Tên:
                <input
                  type="text"
                  name="username"
                  value={updatedUserData.username}
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={updatedUserData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </label>
              <button onClick={handleSaveChanges}>Lưu thay đổi</button>
              <button onClick={() => setIsEditing(false)}>Hủy</button>
            </div>
          ) : (
            <div>
              <p>Tên: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <button onClick={() => setIsEditing(true)}>Cập nhật</button>
            </div>
          )}
        </div>
      )}
      {userData && userData.email === "admin@gmail.com" && (
        <button onClick={() => navigate("/admin")}>
          Chuyển đến trang Admin
        </button>
      )}
      <div className="exam-history">
        <h2>Lịch sử làm bài thi</h2>
        {Object.keys(examStats).length > 0 ? (
          <div className="exam-history-list">
            {Object.values(examStats).map((stat: any) => (
              <div key={stat.testId} className="exam-history-item">
                <div className="exam-info">
                  <div className="exam-header">
                    <h3>Đề thi #{stat.testId}</h3>
                    <div className="attempt-badge">
                      {stat.attempts} lần thi
                    </div>
                  </div>
                  
                  <div className="exam-summary">
                    <div className="summary-item best-score">
                      <span className="label">🏆 Điểm cao nhất:</span>
                      <span className="value">{stat.bestScore}/{stat.allAttempts[0]?.totalQuestions || 0} ({stat.bestPercentage}%)</span>
                    </div>
                    
                    <div className="summary-item attempts">
                      <span className="label">📊 Số lần thi:</span>
                      <span className="value">{stat.attempts}</span>
                    </div>
                    
                    <div className="summary-item avg-time">
                      <span className="label">⏱️ Thời gian TB:</span>
                      <span className="value">{stat.averageTime} phút</span>
                    </div>
                    
                    <div className="summary-item last-attempt">
                      <span className="label">📅 Lần cuối:</span>
                      <span className="value">
                        {stat.lastAttempt ? stat.lastAttempt.toLocaleDateString('vi-VN') : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {stat.attempts > 1 && (
                    <div className="attempt-history">
                      <h4>Lịch sử thi:</h4>
                      <div className="attempts-list">
                        {stat.allAttempts.map((attempt: any, index: number) => (
                          <div key={attempt.id} className="attempt-item">
                            <span className="attempt-number">Lần {index + 1}</span>
                            <span className="attempt-score">{attempt.score}/{attempt.totalQuestions} ({attempt.percentage}%)</span>
                            <span className="attempt-time">{attempt.timeTaken} phút</span>
                            <span className="attempt-date">{attempt.date.toLocaleDateString('vi-VN')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="exam-actions">
                  <button
                    onClick={() => navigate(`/test/${stat.testId}`)}
                    className="btn-retake"
                    title="Thi lại đề này"
                  >
                    🔄 Thi lại
                  </button>
                  <button
                    onClick={() => handleDeleteExam(stat.testId)}
                    disabled={deletingId === stat.testId}
                    className="btn-delete"
                    title="Xóa tất cả lần thi của đề này"
                  >
                    {deletingId === stat.testId ? (
                      <>
                        <span className="loading-spinner"></span>
                        Đang xóa...
                      </>
                    ) : (
                      <>
                        🗑️ Xóa
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-exam-history">
            <div className="no-exam-icon">📝</div>
            <p>Chưa có lịch sử làm bài thi nào</p>
            <button onClick={() => navigate("/courses")} className="btn-start-exam">
              Bắt đầu làm bài thi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
