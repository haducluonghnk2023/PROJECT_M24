import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="account-section">
            <span className="material-symbols-outlined account-icon">
              account_circle
            </span>
            <span className="account-text"> Account</span>
          </div>
          <div className="auth-links">
            <Link to="/register/user" className="header-link">
              Đăng kí
            </Link>
            <span className="header-link-divider">/</span>
            <Link to="/register/user/login" className="header-link">
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
