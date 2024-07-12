import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/userAccount.scss";

export default function UserAccount() {
  const [userData, setUserData] = useState<any>(null);
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState<any>({});
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/users");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu người dùng");
      }
      const data = await response.json();
      setUserData(data[1]);
      setUpdatedUserData(data[1]); // Initialize updated user data
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi cập nhật thông tin người dùng");
      }

      const data = await response.json();
      setUserData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    const storedHistory = JSON.parse(
      localStorage.getItem("examHistory") || "[]"
    );
    setExamHistory(storedHistory);
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
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={updatedUserData.email}
                  onChange={handleInputChange}
                />
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
      <div className="exam-history">
        <h2>Lịch sử làm bài thi</h2>
        {examHistory.length > 0 ? (
          <ul>
            {examHistory.map((history, index) => (
              <li key={index}>
                Đề thi: {history.questionId}, Số câu đúng: {history.score}/
                {history.totalQuestions}, Thời gian làm bài: {history.timeTaken}{" "}
                giây
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có lịch sử làm bài thi.</p>
        )}
      </div>
    </div>
  );
}
