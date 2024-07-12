import React, { useState, useEffect } from "react";
import "../../styles/admin/addQuestion.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addQuestion } from "../../service/course.servce";

interface Question {
  id: number;
  testId: any;
  question: string;
  answer: string;
  option: string[];
}

export default function AddQuestion() {
  const dispatch = useDispatch<AppDispatch>();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState<Question>({
    id: 0,
    testId: 0,
    question: "",
    answer: "",
    option: ["", "", "", ""],
  });
  const [formErrors, setFormErrors] = useState<Partial<Question>>({
    question: "",
    answer: "",
    testId: 0,
    option: ["", "", "", ""],
  });
  const [tests, setTests] = useState<any[]>([]);

  useEffect(() => {
    fetchTestsApi();
  }, []);

  const fetchTestsApi = async () => {
    try {
      const response = await fetch("http://localhost:8080/test");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu đề thi");
      }
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const validate = () => {
    const errors: Partial<Question> = {};
    if (!formData.question.trim()) {
      errors.question = "Vui lòng nhập câu hỏi";
    }
    if (!formData.answer.trim()) {
      errors.answer = "Vui lòng nhập đáp án câu hỏi";
    }
    if (!formData.testId) {
      errors.testId = "Vui lòng chọn đề thi";
    }
    if (formData.option.some((opt) => !opt.trim())) {
      errors.option = ["Vui lòng nhập tất cả các lựa chọn"];
    }
    setFormErrors(errors);
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
        setFormData({
          id: 0,
          testId: 0,
          question: "",
          answer: "",
          option: ["", "", "", ""],
        });
        setFormErrors({
          question: "",
          answer: "",
          testId: 0,
          option: ["", "", "", ""],
        });
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

    if (formErrors[name as keyof Question]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...formData.option];
    newOptions[index] = e.target.value;
    setFormData({
      ...formData,
      option: newOptions,
    });

    if (formErrors.option && formErrors.option.length > 0) {
      const newErrors = [...formErrors.option];
      newErrors[index] = "";
      setFormErrors({
        ...formErrors,
        option: newErrors,
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
          {tests.map((test) => (
            <option key={test.id} value={test.id}>
              {test.title}
            </option>
          ))}
        </select>
        {formErrors.testId && <p className="error">{formErrors.testId}</p>}
        <label>Các lựa chọn:</label>
        {formData.option.map((opt, index) => (
          <div key={index}>
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(e, index)}
              placeholder={`Lựa chọn ${index + 1}`}
            />
            {formErrors.option && formErrors.option[index] && (
              <p className="error">{formErrors.option[index]}</p>
            )}
          </div>
        ))}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
