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
  