import React, { useState, useEffect } from "react";
import "../../styles/admin/addQuestion.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  addQuestion,
  fetchExamSubject,
  fetchExamSubjectUser,
  fetchTest,
} from "../../service/course.servce";

interface FormData {
  question: string;
  answer: string;
  testId: number | string;
}

export default function AddQuestion() {
  const dispatch = useDispatch<AppDispatch>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    question: "",
    answer: "",
    testId: 0,
  });
  const [formErrors, setFormErrors] = useState<FormData>({
    question: "",
    answer: "",
    testId: 0,
  });

  const [questions, setQuestions] = useState<any>([]);

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    try {
      const response = await fetch("http://localhost:8080/test");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu khóa thi");
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  const validate = () => {
    const errors: Partial<FormData> = {};
    if (!formData.question.trim()) {
      errors.question = "Vui lòng nhập câu hỏi";
    }
    if (!formData.answer.trim()) {
      errors.answer = "Vui lòng nhập đáp án câu hỏi";
    }
    if (!formData.testId) {
      errors.testId = "Vui lòng chọn đề thi";
    }
    setFormErrors(errors as FormData);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    dispatch(addQuestion(formData))
      .then(() => {
        setShowSuccessMessage(true);
        setFormData({ question: "", answer: "", testId: 0 });
        setFormErrors({ question: "", answer: "", testId: 0 });
      })
      .catch((err: any) => {
        console.error("Thêm câu hỏi không thành công:", err);
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "testId" ? Number(value) : value,
    });

    if (formErrors[name as keyof FormData]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  return (
    <div className="add-question">
      <h2>Thêm câu hỏi mới</h2>
      {showSuccessMessage && (
        <div className="success-message">
          <p>Thêm câu hỏi thành công!</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          value={formData.question}
          type="text"
          name="question"
          placeholder="Câu hỏi cần thêm"
        />
        {formErrors.question && <p className="error">{formErrors.question}</p>}
        <input
          onChange={handleInputChange}
          value={formData.answer}
          type="text"
          name="answer"
          placeholder="Đáp án"
        />
        {formErrors.answer && <p className="error">{formErrors.answer}</p>}
        <select
          name="testId"
          value={formData.testId}
          onChange={handleInputChange}
        >
          <option value="">Chọn đề thi</option>
          {questions.map((test: any) => (
            <option key={test.id} value={test.id}>
              {test.title}
            </option>
          ))}
        </select>
        {formErrors.testId && <p className="error">{formErrors.testId}</p>}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
