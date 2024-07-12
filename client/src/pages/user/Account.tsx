import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/userAccount.scss";
import axios from "axios";

export default function UserAccount() {
  const [userData, setUserData] = useState<any>(null);
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState<any>({});
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSaveChanges = async () => {
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

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("examHistory") || "[]"
    );
    setExamHistory(storedHistory);

    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    );

    if (loggedInUser) {
      console.log(111111);
      setUserData(loggedInUser);
      setUpdatedUserData(loggedInUser);
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
