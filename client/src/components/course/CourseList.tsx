import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { courseService } from '../../services/courseService';
import { Course } from '../../types';
import { Card, CardContent, CardTitle, CardDescription, Badge, Button } from '../common';

export const CourseList: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  // State for courses
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.getCourses();
      setCourses(response);
    } catch (error) {
      console.error('Lỗi khi tải danh sách khóa thi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinCourse = (courseId: number) => {
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để tham gia thi.');
      return;
    }
    // dispatch(getCourseId(courseId));
    // dispatch(fetchExamSubject());
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Đang tải danh sách khóa học...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course: Course) => (
              <Card 
                key={course.id} 
                variant="elevated" 
                hover 
                className="group cursor-pointer"
                onClick={() => handleJoinCourse(course.id)}
              >
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <Badge variant="primary" size="sm">
                      Khóa học
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {course.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 mb-6 line-clamp-3">
                    {course.description || 'Không có mô tả chi tiết về khóa học này.'}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Tham gia ngay</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinCourse(course.id);
                      }}
                    >
                      Tham gia
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Không có khóa học nào</h3>
              <p className="text-gray-600">Hiện tại chưa có khóa học nào được tạo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
