// API Configuration
export const API_BASE_URL = 'http://localhost:8080';

// API Endpoints
export const API_ENDPOINTS = {
  USERS: '/users',
  COURSES: '/courses',
  EXAM_SUBJECTS: '/examSubject',
  QUESTIONS: '/questions',
  TESTS: '/test',
} as const;

// App Routes
export const ROUTES = {
  HOME: '/',
  USER_HOME: '/user',
  USER_LOGIN: '/register/user/login',
  USER_REGISTER: '/register/user',
  USER_ACCOUNT: '/user/account',
  USER_CONTENT: '/user/content',
  COURSE_DETAIL: '/course/:courseId',
  TEST_DETAIL: '/test/:testId',
  QUESTION_DETAIL: '/questions/:questionId',
  ADMIN_LOGIN: '/login/admin',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/all-user',
  ADMIN_ADD_USER: '/admin/add-user',
  ADMIN_COURSES: '/admin/all-course',
  ADMIN_ADD_COURSE: '/admin/add-course',
  ADMIN_SUBJECTS: '/admin/all-subject',
  ADMIN_ADD_SUBJECT: '/admin/add-subject',
  ADMIN_TESTS: '/admin/all-test',
  ADMIN_ADD_TEST: '/admin/add-test',
  ADMIN_QUESTIONS: '/admin/all-question',
  ADMIN_ADD_QUESTION: '/admin/add-question',
} as const;

// Form Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6,
  MIN_USERNAME_LENGTH: 6,
  USERNAME_REGEX: /^[a-zA-Z0-9]+$/,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  IS_LOGGED_IN: 'isLoggedIn',
  LOGGED_IN_USER: 'loggedInUser',
  LOGGED_EMAIL: 'loggedEmail',
  ADMIN_TOKEN: 'adminToken',
  EXAM_SUBJECTS: 'examSubjects',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 4,
  DEFAULT_PAGE: 1,
} as const;

// User Roles
export const USER_ROLES = {
  USER: 0,
  ADMIN: 1,
} as const;

// User Status
export const USER_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
} as const;
