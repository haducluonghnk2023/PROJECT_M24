import { Route, Routes } from "react-router-dom";
import { UserLayout } from "./layouts/UserLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { AdminLoginPage } from "./pages/auth/AdminLoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { HomePage } from "./pages/user/HomePage";
import { CoursePage } from "./pages/user/CoursePage";
import UserAccount from "./pages/user/Account";
import Question from "./pages/user/Question";
import Test from "./pages/user/Test";
import { DashboardPage } from "./pages/admin/DashboardPage";
import AddUser from "./pages/admin/AddUser";
import AllUser from "./pages/admin/AllUser";
import AddCourses from "./pages/admin/AddCourses";
import AllCourses from "./pages/admin/AllCourses";
import AddSubject from "./pages/admin/AddSubject";
import AllSubject from "./pages/admin/AllSubject";
import AddTest from "./pages/admin/AddTest";
import AllTest from "./pages/admin/AllTest";
import AddQuestion from "./pages/admin/AddQuestion";
import AllQuestion from "./pages/admin/AllQuestion";
import { ROUTES } from "./constants";

export default function App() {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.USER_REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.USER_LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
        
        {/* User routes */}
        <Route path={ROUTES.USER_HOME} element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="content" element={<HomePage />} />
          <Route path="account" element={<UserAccount />} />
        </Route>
        
        {/* Courses route */}
        <Route path="/courses" element={<UserLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        
        {/* Course detail route */}
        <Route path={ROUTES.COURSE_DETAIL} element={<CoursePage />} />
        
        {/* Test and Question routes */}
        <Route path={ROUTES.TEST_DETAIL} element={<UserLayout />}>
          <Route index element={<Test />} />
        </Route>
        <Route path={ROUTES.QUESTION_DETAIL} element={<UserLayout />}>
          <Route index element={<Question />} />
        </Route>
        
        {/* Admin routes */}
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* User management routes */}
          <Route path="add-user" element={<AddUser />} />
          <Route path="all-user" element={<AllUser />} />
          
          {/* Course management routes */}
          <Route path="add-course" element={<AddCourses />} />
          <Route path="all-course" element={<AllCourses />} />
          
          {/* Subject management routes */}
          <Route path="add-subject" element={<AddSubject />} />
          <Route path="all-subject" element={<AllSubject />} />
          
          {/* Test management routes */}
          <Route path="add-test" element={<AddTest />} />
          <Route path="all-test" element={<AllTest />} />
          
          {/* Question management routes */}
          <Route path="add-question" element={<AddQuestion />} />
          <Route path="all-question" element={<AllQuestion />} />
        </Route>
        
        {/* Root redirect */}
        <Route path={ROUTES.HOME} element={<UserLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}
