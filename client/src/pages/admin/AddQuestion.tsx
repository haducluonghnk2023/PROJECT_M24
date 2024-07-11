import React, { useState } from "react";
import "../../styles/admin/addQuestion.scss";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addQuestion } from "../../service/course.servce";

interface FormData {
  question: string;
  answer: string;
}

export default function AddQuestion() {
  const dispatch = useDispatch<AppDispatch>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    question: "",
    answer: "",
  });

  const [formErrors, setFormErrors] = useState<FormData>({
    question: "",
    answer: "",
  });

  const validate = () => {
    const errors: Partial<FormData> = {};
    if (!formData.question.trim()) {
      errors.question = "Vui lòng nhập câu hỏi";
    }
    if (!formData.answer.trim()) {
      errors.answer = "Vui lòng nhập đáp án câu hỏi";
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
        setFormData({ question: "", answer: "" });
        setFormErrors({ question: "", answer: "" });
      })
      .catch((err: any) => {
        console.error("Thêm câu hỏi không thành công:", err);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
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
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
