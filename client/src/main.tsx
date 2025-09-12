import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/design-system.scss";
import "./styles/user/user.scss";
import "./styles/user/carousel.scss";
import "./styles/user/course.scss";
import "./styles/user/question.scss";
import "./styles/user/test.scss";
import "./styles/user/userAccount.scss";
import "./styles/admin/admin.scss";
import "./styles/admin/addCourse.scss";
import "./styles/admin/addQuestion.scss";
import "./styles/admin/addSubject.scss";
import "./styles/admin/addTest.scss";
import "./styles/admin/addUser.scss";
import "./styles/admin/allCourse.scss";
import "./styles/admin/allSubject.scss";
import "./styles/admin/allUser.scss";
import "./styles/admin/courseReducer.scss";
import "./styles/admin/login.scss";
import "./styles/admin/register.scss";
import "./styles/sweetalert2.scss";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
