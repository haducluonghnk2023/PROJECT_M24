import { api } from '../utils/api';
import { API_ENDPOINTS } from '../constants';
import { User, RegisterFormData } from '../types';

export const authService = {
  // Get all users
  getUsers: (searchUser: string = '') => 
    api.get<User[]>(`${API_ENDPOINTS.USERS}?username_like=${searchUser}`),

  // Check if email exists
  checkEmail: async (email: string): Promise<boolean> => {
    try {
      const response = await api.get<User[]>(`${API_ENDPOINTS.USERS}?email=${email}`);
      return response.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  },

  // Check if username exists
  checkUsername: async (username: string): Promise<boolean> => {
    try {
      const response = await api.get<User[]>(`${API_ENDPOINTS.USERS}?username=${username}`);
      return response.length > 0;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  },

  // Register new user with duplicate check
  registerUser: async (userData: RegisterFormData): Promise<User> => {
    // Check for duplicate email
    const emailExists = await authService.checkEmail(userData.email);
    if (emailExists) {
      throw new Error('Email đã tồn tại trong hệ thống');
    }

    // Check for duplicate username
    const usernameExists = await authService.checkUsername(userData.username);
    if (usernameExists) {
      throw new Error('Tên người dùng đã tồn tại trong hệ thống');
    }

    return api.post<User>(API_ENDPOINTS.USERS, userData);
  },

  // Update user status
  updateUserStatus: (userId: number, status: number) =>
    api.patch<User>(`${API_ENDPOINTS.USERS}/${userId}`, { status }),

  // Delete user
  deleteUser: (userId: number) =>
    api.delete(`${API_ENDPOINTS.USERS}/${userId}`),
};
