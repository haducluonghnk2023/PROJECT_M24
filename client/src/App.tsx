import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import DashBoard from "./pages/admin/DashBoard";
import AllUser from "./pages/admin/AllUser";
import AddCourse from "./pages/admin/AddCourses";
import AllCourse from "./pages/admin/AllCourses";
import AddSubject from "./pages/admin/AddSubject";
import AllSubject from "./pages/admin/AllSubject";
import Register from "./pages/admin/Register";
import Login from "./pages/admin/Login";
import AddUser from "./pages/admin/AddUser";
import AllTest from "./pages/admin/AllTest";
import AddTest from "./pages/admin/AddTest";
import AddQuestion from "./pages/admin/AddQuestion";
import AllQuestion from "./pages/admin/AllQuestion";
// import NotFound from "./pages/admin/NotFound";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="all-user" element={<AllUser />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="all-course" element={<AllCourse />} />
          <Route path="add-subject" element={<AddSubject />} />
          <Route path="all-subject" element={<AllSubject />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="all-test" element={<AllTest />} />
          <Route path="add-test" element={<AddTest />} />
          <Route path="add-question" element={<AddQuestion />} />
          <Route path="all-question" element={<AllQuestion />} />
          {/* <Route path="*" element={<Navigate to="/not-found" />} /> */}
        </Route>
        {/* <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} /> */}
      </Routes>
    </div>
  );
}
