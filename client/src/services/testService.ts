import { api } from '../utils/api';
import { API_ENDPOINTS } from '../constants';
import { Test, Question } from '../types';

export const testService = {
  // Get all tests
  getTests: () => api.get<Test[]>(API_ENDPOINTS.TESTS),

  // Get test by ID
  getTestById: (id: number) => api.get<Test>(`${API_ENDPOINTS.TESTS}/${id}`),

  // Create new test
  createTest: (testData: Omit<Test, 'id'>) =>
    api.post<Test>(API_ENDPOINTS.TESTS, testData),

  // Update test
  updateTest: (id: number, testData: Partial<Test>) =>
    api.put<Test>(`${API_ENDPOINTS.TESTS}/${id}`, testData),

  // Delete test
  deleteTest: (id: number) => api.delete(`${API_ENDPOINTS.TESTS}/${id}`),

  // Get all questions
  getQuestions: () => api.get<Question[]>(API_ENDPOINTS.QUESTIONS),

  // Get question by ID
  getQuestionById: (id: number) => api.get<Question>(`${API_ENDPOINTS.QUESTIONS}/${id}`),

  // Create new question
  createQuestion: (questionData: Omit<Question, 'id'>) =>
    api.post<Question>(API_ENDPOINTS.QUESTIONS, questionData),

  // Update question
  updateQuestion: (id: number, questionData: Partial<Question>) =>
    api.put<Question>(`${API_ENDPOINTS.QUESTIONS}/${id}`, questionData),

  // Delete question
  deleteQuestion: (id: number) => api.delete(`${API_ENDPOINTS.QUESTIONS}/${id}`),
};
