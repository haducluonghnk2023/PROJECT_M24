import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const UserHeader: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/register/user/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        {isLoggedIn && (
          <div
            className="account-section"
            onClick={() => navigate('/user/account')}
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
  );
};
