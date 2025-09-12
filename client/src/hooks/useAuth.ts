import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS, ROUTES } from '../constants';

export interface User {
  id: number;
  username: string;
  email: string;
  role: number;
  status: number;
}

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
    const userData = localStorage.getItem(STORAGE_KEYS.LOGGED_IN_USER);
    
    if (loggedIn === 'true' && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
        setIsAdmin(parsedUser.email === 'admin@gmail.com');
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
    localStorage.setItem(STORAGE_KEYS.LOGGED_IN_USER, JSON.stringify(userData));
    localStorage.setItem(STORAGE_KEYS.LOGGED_EMAIL, userData.email);
    
    setUser(userData);
    setIsLoggedIn(true);
    setIsAdmin(userData.email === 'admin@gmail.com');
  };

  const adminLogin = (userData: User) => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, 'admin-token');
    login(userData);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    localStorage.removeItem(STORAGE_KEYS.LOGGED_IN_USER);
    localStorage.removeItem(STORAGE_KEYS.LOGGED_EMAIL);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const requireAuth = (redirectTo: string = ROUTES.USER_LOGIN) => {
    if (!isLoggedIn) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  const requireAdmin = (redirectTo: string = ROUTES.ADMIN_LOGIN) => {
    if (!isLoggedIn || !isAdmin) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  return {
    isLoggedIn,
    user,
    isAdmin,
    login,
    adminLogin,
    logout,
    requireAuth,
    requireAdmin,
  };
};
