import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/auth/AuthForm';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { LoginFormData } from '../../types';
import bcrypt from 'bcryptjs';

export const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await authService.getUsers();
      const user = response.find((user: any) => user.email === data.email);

      if (user) {
        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (passwordMatch) {
          console.log('Đăng nhập thành công:', user);
          login(user);
          navigate('/user');
        } else {
          setErrorMessage('Mật khẩu không đúng. Vui lòng kiểm tra lại thông tin.');
        }
      } else {
        setErrorMessage('Email không tồn tại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (error) {
      setErrorMessage('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      console.error('Lỗi khi đăng nhập:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      mode="login"
      onSubmit={handleSubmit}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
};
