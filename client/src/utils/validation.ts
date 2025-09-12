import { VALIDATION_RULES } from '../constants';

export interface ValidationError {
  [key: string]: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email không được để trống';
  }
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return 'Định dạng email không hợp lệ';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Mật khẩu không được để trống';
  }
  if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    return `Mật khẩu phải có ít nhất ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} ký tự`;
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) {
    return 'Tên người dùng không được để trống';
  }
  if (username.length < VALIDATION_RULES.MIN_USERNAME_LENGTH) {
    return `Tên người dùng phải có ít nhất ${VALIDATION_RULES.MIN_USERNAME_LENGTH} ký tự`;
  }
  if (!VALIDATION_RULES.USERNAME_REGEX.test(username)) {
    return 'Tên người dùng không được chứa ký tự đặc biệt';
  }
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return 'Vui lòng xác nhận lại mật khẩu';
  }
  if (confirmPassword !== password) {
    return 'Mật khẩu không khớp';
  }
  return null;
};

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

export const validateLoginForm = (formData: LoginFormData): ValidationError => {
  const errors: ValidationError = {};
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

export const validateRegisterForm = (formData: RegisterFormData): ValidationError => {
  const errors: ValidationError = {};
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const usernameError = validateUsername(formData.username);
  if (usernameError) errors.username = usernameError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(formData.password, formData.repassword);
  if (confirmPasswordError) errors.repassword = confirmPasswordError;
  
  return errors;
};

// Validation cho Course
export const validateCourse = (title: string, description: string): ValidationError => {
  const errors: ValidationError = {};
  
  if (!title || title.trim().length === 0) {
    errors.title = 'Tên khóa học không được để trống';
  } else if (title.trim().length < 3) {
    errors.title = 'Tên khóa học phải có ít nhất 3 ký tự';
  }
  
  if (!description || description.trim().length === 0) {
    errors.description = 'Mô tả không được để trống';
  } else if (description.trim().length < 10) {
    errors.description = 'Mô tả phải có ít nhất 10 ký tự';
  }
  
  return errors;
};

// Validation cho Subject
export const validateSubject = (title: string, description: string, courseId: number): ValidationError => {
  const errors: ValidationError = {};
  
  if (!title || title.trim().length === 0) {
    errors.title = 'Tên môn thi không được để trống';
  } else if (title.trim().length < 3) {
    errors.title = 'Tên môn thi phải có ít nhất 3 ký tự';
  }
  
  if (!description || description.trim().length === 0) {
    errors.description = 'Mô tả không được để trống';
  } else if (description.trim().length < 10) {
    errors.description = 'Mô tả phải có ít nhất 10 ký tự';
  }
  
  if (!courseId || courseId <= 0) {
    errors.courseId = 'Vui lòng chọn khóa học';
  }
  
  return errors;
};

// Validation cho Test
export const validateTest = (title: string, description: string, subjectId: number, timeLimit: number): ValidationError => {
  const errors: ValidationError = {};
  
  if (!title || title.trim().length === 0) {
    errors.title = 'Tên đề thi không được để trống';
  } else if (title.trim().length < 3) {
    errors.title = 'Tên đề thi phải có ít nhất 3 ký tự';
  }
  
  if (!description || description.trim().length === 0) {
    errors.description = 'Mô tả không được để trống';
  } else if (description.trim().length < 10) {
    errors.description = 'Mô tả phải có ít nhất 10 ký tự';
  }
  
  if (!subjectId || subjectId <= 0) {
    errors.subjectId = 'Vui lòng chọn môn thi';
  }
  
  if (!timeLimit || timeLimit <= 0) {
    errors.timeLimit = 'Thời gian làm bài phải lớn hơn 0';
  } else if (timeLimit < 5) {
    errors.timeLimit = 'Thời gian làm bài tối thiểu là 5 phút';
  }
  
  return errors;
};

// Validation cho Question
export const validateQuestion = (question: string, options: string[], correctAnswer: number): ValidationError => {
  const errors: ValidationError = {};
  
  if (!question || question.trim().length === 0) {
    errors.question = 'Câu hỏi không được để trống';
  } else if (question.trim().length < 10) {
    errors.question = 'Câu hỏi phải có ít nhất 10 ký tự';
  }
  
  if (!options || options.length < 2) {
    errors.options = 'Phải có ít nhất 2 lựa chọn';
  } else {
    options.forEach((option, index) => {
      if (!option || option.trim().length === 0) {
        errors[`option${index}`] = `Lựa chọn ${index + 1} không được để trống`;
      }
    });
  }
  
  if (correctAnswer < 0 || correctAnswer >= (options?.length || 0)) {
    errors.correctAnswer = 'Đáp án đúng không hợp lệ';
  }
  
  return errors;
};