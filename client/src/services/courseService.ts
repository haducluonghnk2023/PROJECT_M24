import { api } from '../utils/api';
import { API_ENDPOINTS } from '../constants';
import { Course, ExamSubject } from '../types';

export const courseService = {
  // Get all courses
  getCourses: () => api.get<Course[]>(API_ENDPOINTS.COURSES),

  // Get course by ID
  getCourseById: (id: number) => api.get<Course>(`${API_ENDPOINTS.COURSES}/${id}`),

  // Check if course title exists
  checkCourseTitle: async (title: string, excludeId?: number): Promise<boolean> => {
    try {
      const response = await api.get<Course[]>(`${API_ENDPOINTS.COURSES}?title=${title}`);
      if (excludeId) {
        return response.some(course => course.id !== excludeId);
      }
      return response.length > 0;
    } catch (error) {
      console.error('Error checking course title:', error);
      return false;
    }
  },

  // Create new course with duplicate check
  createCourse: async (courseData: Omit<Course, 'id'>): Promise<Course> => {
    const titleExists = await courseService.checkCourseTitle(courseData.title);
    if (titleExists) {
      throw new Error('Tên khóa học đã tồn tại trong hệ thống');
    }
    return api.post<Course>(API_ENDPOINTS.COURSES, courseData);
  },

  // Update course with duplicate check
  updateCourse: async (id: number, courseData: Partial<Course>): Promise<Course> => {
    if (courseData.title) {
      const titleExists = await courseService.checkCourseTitle(courseData.title, id);
      if (titleExists) {
        throw new Error('Tên khóa học đã tồn tại trong hệ thống');
      }
    }
    return api.put<Course>(`${API_ENDPOINTS.COURSES}/${id}`, courseData);
  },

  // Delete course
  deleteCourse: (id: number) => api.delete(`${API_ENDPOINTS.COURSES}/${id}`),

  // Get exam subjects
  getExamSubjects: () => api.get<ExamSubject[]>(API_ENDPOINTS.EXAM_SUBJECTS),

  // Get exam subjects by course ID
  getExamSubjectsByCourse: (courseId: number) =>
    api.get<ExamSubject[]>(`${API_ENDPOINTS.EXAM_SUBJECTS}?courseId=${courseId}`),

  // Search exam subjects
  searchExamSubjects: (keyword: string) =>
    api.get<ExamSubject[]>(`${API_ENDPOINTS.EXAM_SUBJECTS}?title_like=${keyword}`),

  // Check if exam subject title exists
  checkExamSubjectTitle: async (title: string, courseId: number, excludeId?: number): Promise<boolean> => {
    try {
      const response = await api.get<ExamSubject[]>(`${API_ENDPOINTS.EXAM_SUBJECTS}?title=${title}&courseId=${courseId}`);
      if (excludeId) {
        return response.some(subject => subject.id !== excludeId);
      }
      return response.length > 0;
    } catch (error) {
      console.error('Error checking exam subject title:', error);
      return false;
    }
  },

  // Create exam subject with duplicate check
  createExamSubject: async (subjectData: Omit<ExamSubject, 'id'>): Promise<ExamSubject> => {
    const titleExists = await courseService.checkExamSubjectTitle(subjectData.title, subjectData.courseId);
    if (titleExists) {
      throw new Error('Tên môn thi đã tồn tại trong khóa học này');
    }
    return api.post<ExamSubject>(API_ENDPOINTS.EXAM_SUBJECTS, subjectData);
  },

  // Update exam subject with duplicate check
  updateExamSubject: async (id: number, subjectData: Partial<ExamSubject>): Promise<ExamSubject> => {
    if (subjectData.title && subjectData.courseId) {
      const titleExists = await courseService.checkExamSubjectTitle(subjectData.title, subjectData.courseId, id);
      if (titleExists) {
        throw new Error('Tên môn thi đã tồn tại trong khóa học này');
      }
    }
    return api.put<ExamSubject>(`${API_ENDPOINTS.EXAM_SUBJECTS}/${id}`, subjectData);
  },

  // Delete exam subject
  deleteExamSubject: (id: number) => api.delete(`${API_ENDPOINTS.EXAM_SUBJECTS}/${id}`),
};
