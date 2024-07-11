import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/user/question.scss";
interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questionsData: Record<
  number,
  { subject: string; questions: Question[]; time: number }
> = {
  1: {
    subject: "Toán",
    questions: [
      {
        question: "Câu hỏi 1: 1 + 1 = ?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
      },
      {
        question: "Câu hỏi 2: 2 + 2 = ?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
      },
    ],
    time: 60,
  },
  2: {
    subject: "Văn",
    questions: [
      {
        question: "Phân tích bài thơ 'Qua Đèo Ngang'.",
        options: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
        correctAnswer: 0,
      },
      {
        question: "Bình luận về nhân vật chính trong truyện 'Chiếc Lược Ngà'.",
        options: ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
        correctAnswer: 1,
      },
    ],
    time: 120,
  },
};

export default function Questions() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (subjectId && questionsData[Number(subjectId)]) {
      setQuestions(questionsData[Number(subjectId)].questions);
      setSubject(questionsData[Number(subjectId)].subject);
      setTime(questionsData[Number(subjectId)].time);
      setAnswers(
        new Array(questionsData[Number(subjectId)].questions.length).fill(-1)
      );
    }
  }, [subjectId]);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });

    alert(`Bài thi đã được nộp! Điểm của bạn: ${score}/${questions.length}`);
    navigate("/user");
  };

  return (
    <div className="questions-page">
      <h1>{subject}</h1>
      <div className="timer">Thời gian làm bài: {time} phút</div>
      <div className="questions-list">
        {questions.map((question, index) => (
          <div key={index} className="question-item">
            <p>{question.question}</p>
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={answers[index] === optionIndex}
                    onChange={() => handleAnswerChange(index, optionIndex)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        Nộp bài
      </button>
    </div>
  );
}
