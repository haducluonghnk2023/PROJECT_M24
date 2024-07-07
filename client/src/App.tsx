import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import DashBoard from "./pages/admin/DashBoard";
import AllUser from "./pages/admin/AllUser";
import AddExam from "./pages/admin/AddExam";
import AllExam from "./pages/admin/AllExam";
import AddSubject from "./pages/admin/AddSubject";
import AllSubject from "./pages/admin/AllSubject";
import Register from "./pages/admin/Register";
import Login from "./pages/admin/Login";
import AddUser from "./pages/admin/AddUser";
import AllTest from "./pages/admin/AllTest";
import AddTest from "./pages/admin/AddTest";
import AddQuestion from "./pages/admin/AddQuestion";
import AllQuestion from "./pages/admin/AllQuestion";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="all-user" element={<AllUser />} />
          <Route path="add-exam" element={<AddExam />} />
          <Route path="all-exam" element={<AllExam />} />
          <Route path="add-subject" element={<AddSubject />} />
          <Route path="all-subject" element={<AllSubject />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="all-test" element={<AllTest />} />
          <Route path="add-test" element={<AddTest />} />
          <Route path="add-question" element={<AddQuestion />} />
          <Route path="all-question" element={<AllQuestion />} />
        </Route>
      </Routes>
    </div>
  );
}
