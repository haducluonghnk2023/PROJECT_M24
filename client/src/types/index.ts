// User related types
export interface User {
  id: number;
  username: string;
  email: string;
  birthdate?: string;
  role: number;
  status: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  repassword: string;
  role: number;
  status: number;
}

// Course related types
export interface Course {
  id: number;
  title: string;
  description: string;
}

export interface ExamSubject {
  id: number;
  title: string;
  description?: string;
  courseId: number;
}

// Test related types
export interface Test {
  id: number;
  title: string;
  description?: string;
  subjectId: number;
  timeLimit?: number;
  totalQuestions?: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  testId: number;
  explanation?: string;
}

// Redux state types
export interface AdminState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface CourseState {
  courses: Course[];
  examSubjects: ExamSubject[];
  loading: boolean;
  error: string | null;
}

export interface TestState {
  tests: Test[];
  questions: Question[];
  loading: boolean;
  error: string | null;
}

export interface UserState {
  examSubjects: ExamSubject[];
  loading: boolean;
  error: string | null;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Form validation types
export interface ValidationError {
  [key: string]: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
