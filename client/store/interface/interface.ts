export interface User {
    id: number;
    name: string;
    email: string; 
}
export interface Course {
    courseName: string;
    examDate: string;
  }
  
  export interface CoursesState {
    courses: Course[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  

export interface FormData {
  name: string;
  username: string;
  password: string;
  repassword: string;
}