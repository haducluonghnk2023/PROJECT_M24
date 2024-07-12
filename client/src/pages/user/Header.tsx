import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [getUser, setGetUser] = useState<any>(null);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/users");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu người dùng");
      }
      const data = await response.json();
      setGetUser(data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(getUser);

  return (
    <div>
      <header className="header">
        <div className="header-content">
          {getUser && getUser[1].status === 1 ? (
            <div
              className="account-section"
              onClick={() => navigate("/user/account")}
            >
              <span className="material-symbols-outlined account-icon">
                account_circle
              </span>
              <span className="account-text"> Account</span>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/register/user" className="header-link">
                Đăng kí
              </Link>
              <span className="header-link-divider">/</span>
              <Link to="/register/user/login" className="header-link">
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
