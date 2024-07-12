import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/users");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu người dùng");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/register/user/login");
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          {isLoggedIn && (
            <div
              className="account-section"
              onClick={() => navigate("/user/account")}
            >
              <span className="material-symbols-outlined account-icon">
                account_circle
              </span>
              <span className="account-text"> Account</span>
            </div>
          )}

          <div className="auth-links">
            {!isLoggedIn && (
              <>
                <Link to="/register/user" className="header-link">
                  Đăng kí
                </Link>
                <span className="header-link-divider">/</span>
                <Link to="/register/user/login" className="header-link">
                  Đăng nhập
                </Link>
              </>
            )}
            {isLoggedIn && (
              <button onClick={handleLogout} className="header-link">
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
