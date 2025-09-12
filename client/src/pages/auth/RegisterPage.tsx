import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/auth/AuthForm';
import { authService } from '../../services/authService';
import { RegisterFormData } from '../../types';
import bcrypt from 'bcryptjs';

export const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userData = {
        ...data,
        password: hashedPassword,
        repassword: hashedPassword,
      };

      await authService.registerUser(userData);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/register/user/login');
    } catch (error: any) {
      console.error('Lỗi khi đăng ký:', error);
      alert(error.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      mode="register"
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};
