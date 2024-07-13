import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCourse,
  fetchExamSubject,
  getCourseId,
} from "../../service/course.servce";

export default function Banner() {
  const navigate = useNavigate();
  const course = useSelector((state: any) => state.user.examSubject);
  const state = useSelector((state) => state);
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") || "[]");
  // console.log(isLoggedIn);

  const dispatch = useDispatch();
  // console.log(course);
  useEffect(() => {
    dispatch(fetchCourse());
  }, []);

  const handleJoinCourse = (courseId: number) => {
    if (isLoggedIn !== true) {
      alert("Vui lòng đăng nhập để tham gia thi.");
      return;
    }
    dispatch(getCourseId(courseId));
    dispatch(fetchExamSubject());
    // console.log(111111111111111, state);
    navigate(`/course/${courseId}`);
    // console.log(`${courseId}`);
  };

  return (
    <div>
      <main className="course-list">
        <h2>Tất cả các khóa thi</h2>
        <div className="course-cards">
          {course.map((course: any) => {
            return (
              <div className="course-card" key={course.id}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button
                  className="btn"
                  onClick={() => handleJoinCourse(course.id)}
                >
                  Tham gia
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
