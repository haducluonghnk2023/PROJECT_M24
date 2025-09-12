import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Pagination } from '../common/Pagination';
import { courseService } from '../../services/courseService';
import { ExamSubject } from '../../types';
import { PAGINATION } from '../../constants';
import { Card, CardContent, CardTitle, CardDescription, Badge, Button } from '../common';

export const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [examSubjects, setExamSubjects] = useState<ExamSubject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<ExamSubject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  const subjectsPerPage = PAGINATION.DEFAULT_PAGE_SIZE;

  useEffect(() => {
    fetchExamSubjects();
  }, []);

  useEffect(() => {
    if (examSubjects.length > 0 && courseId) {
      filterSubjects();
    }
  }, [examSubjects, courseId, searchKeyword]);

  const fetchExamSubjects = async () => {
    try {
      setLoading(true);
      const response = await courseService.getExamSubjects();
      setExamSubjects(response);
      localStorage.setItem('examSubjects', JSON.stringify(response));
    } catch (error) {
      console.error('Lỗi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    if (keyword.trim() === '') {
      fetchExamSubjects();
    } else {
      searchExamSubjects(keyword);
    }
  };

  const searchExamSubjects = async (keyword: string) => {
    try {
      const response = await courseService.searchExamSubjects(keyword);
      setExamSubjects(response);
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
    }
  };

  const filterSubjects = () => {
    if (examSubjects.length > 0) {
      const filtered = examSubjects.filter(
        (subject: ExamSubject) =>
          subject.courseId === parseInt(courseId!) &&
          subject.title.includes(searchKeyword)
      );
      setFilteredSubjects(filtered);
    }
  };

  const handleJoinExam = (subjectId: number) => {
    console.log('Tham gia môn thi:', subjectId);
    // dispatch(getTestId(subjectId));
    navigate(`/test/${subjectId}`);
  };

  // Pagination
  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = filteredSubjects.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );

  const totalPages = Math.ceil(filteredSubjects.length / subjectsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="py-16">
          <div className="container mx-auto">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Đang tải danh sách môn thi...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="py-8">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Các môn thi trong khóa học
                </h1>
                <p className="text-gray-600">
                  Tìm kiếm và tham gia các môn thi phù hợp với bạn
                </p>
              </div>
              <Link 
                to="/courses" 
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Quay lại
              </Link>
            </div>
            
            <div className="max-w-md">
              <SearchInput
                placeholder="Tìm kiếm môn thi..."
                value={searchKeyword}
                onChange={setSearchKeyword}
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentSubjects.length > 0 ? (
              currentSubjects.map((item: ExamSubject) => (
                <Card 
                  key={item.id} 
                  variant="elevated" 
                  hover 
                  className="group"
                >
                  <CardContent>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <Badge variant="success" size="sm">
                        Môn thi
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl mb-3 group-hover:text-green-600 transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 mb-6 line-clamp-3">
                      {item.description || 'Không có mô tả chi tiết về môn thi này.'}
                    </CardDescription>
                    
                    <Button 
                      variant="success" 
                      size="sm" 
                      fullWidth
                      onClick={() => handleJoinExam(item.id)}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      }
                    >
                      Tham gia môn thi
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Không có môn thi nào</h3>
                <p className="text-gray-600 mb-4">Khóa học này chưa có môn thi nào. Vui lòng quay lại sau.</p>
                <Link to="/courses">
                  <Button variant="outline">
                    Quay lại danh sách
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
