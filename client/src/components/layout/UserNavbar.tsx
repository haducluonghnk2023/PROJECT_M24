import React from 'react';
import { Link } from 'react-router-dom';

export const UserNavbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>Thi online miễn phí</h1>
        <ul className="nav-links">
          <li>
            <Link to="/user">Trang chủ</Link>
          </li>
          <li>
            <Link to="/user/content">Các khóa thi</Link>
          </li>
          <li>
            <Link to="/user">Hỏi đáp</Link>
          </li>
          <li>
            <Link to="/user">Liên hệ</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
