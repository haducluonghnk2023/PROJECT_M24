
  export interface User {
    id: number;
    username: string;
    email: string;
    birthdate: string;
    role: string;
    status: number;
  }
  
  export interface AdminState {
    users: User[];
    loading: boolean;
    error: string | null;
  }
  export interface Course {
    id: number;
    title: string;
    description: string;
  }