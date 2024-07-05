import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import DashBoard from "./pages/DashBoard";
import AllUser from "./pages/AllUser";
import AddExam from "./pages/AddExam";
import AllExam from "./pages/AllExam";
import AddSubject from "./pages/AddSubject";
import AllSubject from "./pages/AllSubject";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser";

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
        </Route>
      </Routes>
    </div>
  );
}
