import { useDispatch } from "react-redux";
import "../../styles/user/test.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTestId } from "../../service/course.servce";
import { SearchInput } from "../../components/common/SearchInput";
import { Button } from "../../components/common/Button";
import { Card, CardContent, CardTitle, CardDescription, Badge } from "../../components/common";

interface Test {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  examSubjectId: number;
  questions?: any[];
}

export default function TestPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { testId } = useParams<{ testId: string }>();
  const [tests, setTests] = useState<Test[]>([]);
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [questionsCount, setQuestionsCount] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchTests();
    fetchQuestionsCount();
  }, []);

  useEffect(() => {
    if (tests.length > 0) {
      const filtered = tests.filter(
        (test: Test) => test.examSubjectId === parseInt(testId!)
      );
      setFilteredTests(filtered);
      setLoading(false);
    }
  }, [tests, testId]);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/test");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu đề thi");
      }
      const data = await response.json();
      setTests(data);
      localStorage.setItem("test", JSON.stringify(data));
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionsCount = async () => {
    try {
      setQuestionsLoading(true);
      const response = await fetch("http://localhost:8080/questions");
      if (!response.ok) {
        throw new Error("Lỗi lấy dữ liệu câu hỏi");
      }
      const questions = await response.json();
      
      // Đếm số câu hỏi cho mỗi test
      const countMap: { [key: number]: number } = {};
      questions.forEach((question: any) => {
        const testId = question.testId;
        countMap[testId] = (countMap[testId] || 0) + 1;
      });
      
      setQuestionsCount(countMap);
    } catch (error) {
      console.error("Lỗi khi lấy số câu hỏi:", error);
    } finally {
      setQuestionsLoading(false);
    }
  };

  const handleJoinExam = (testId: number) => {
    dispatch(getTestId(testId));
    navigate(`/questions/${testId}`);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    if (keyword.trim() === "") {
      setFilteredTests(tests.filter(test => test.examSubjectId === parseInt(testId!)));
    } else {
      const filtered = tests.filter(
        (test: Test) => 
          test.examSubjectId === parseInt(testId!) &&
          test.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredTests(filtered);
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "Không giới hạn";
    if (minutes < 60) return `${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}p` : `${hours} giờ`;
  };

  if (loading) {
    return (
      <div className="test-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Đang tải đề thi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="test-page">
      <div className="test-header">
        <div className="container">
          <h1>Đề thi trực tuyến</h1>
          <p>Chọn đề thi để bắt đầu làm bài</p>
        </div>
      </div>

      <main className="test-main">
        <div className="container">
          <div className="test-controls">
            <SearchInput
              placeholder="Tìm kiếm đề thi..."
              value={searchKeyword}
              onChange={setSearchKeyword}
              onSearch={handleSearch}
              className="test-search"
            />
            <div className="test-count">
              Tìm thấy {filteredTests.length} đề thi
            </div>
          </div>

          <div className="tests-container">
            {filteredTests.length > 0 ? (
              filteredTests.map((test: Test) => (
                <div key={test.id} className="test-card">
                  <div className="test-card-header">
                    <h3>{test.title}</h3>
                    <div className="test-badge">Đề thi</div>
                  </div>
                  
                  <div className="test-card-content">
                    <p className="test-description">
                      {test.description || "Không có mô tả chi tiết"}
                    </p>
                    
                    <div className="test-info">
                      <div className="info-item">
                        <span className="info-label">⏱️ Thời gian:</span>
                        <span className="info-value">{formatDuration(test.duration)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">❓ Số câu hỏi:</span>
                        <span className="info-value">
                          {questionsLoading ? (
                            <span className="loading-text">Đang tải...</span>
                          ) : (
                            questionsCount[test.id] || 0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="test-card-footer">
                    <Button
                      onClick={() => handleJoinExam(test.id)}
                      className="btn-start-test"
                    >
                      Bắt đầu thi
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-tests">
                <div className="no-tests-icon">📝</div>
                <h3>Không có đề thi nào</h3>
                <p>
                  {searchKeyword 
                    ? "Không tìm thấy đề thi phù hợp với từ khóa tìm kiếm"
                    : "Môn thi này chưa có đề thi nào. Vui lòng quay lại sau."
                  }
                </p>
                {searchKeyword && (
                  <Button
                    onClick={() => {
                      setSearchKeyword("");
                      handleSearch("");
                    }}
                    className="btn-clear-search"
                  >
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
