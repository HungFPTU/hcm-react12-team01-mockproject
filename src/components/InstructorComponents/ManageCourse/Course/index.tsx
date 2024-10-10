import React from 'react';
import ButtonCourse from './ButtonCourse';
import SearchCourse from './SearchCourse';
import type { Course } from '../../../../model/Course';
import CourseTable from './TableCourse';

const Course: React.FC = () => {
  const handleSearch = () => {
    // Define the handleSearch function to handle search logic
  };

  const courses: Course[] = []; // Chỉ định kiểu rõ ràng cho mảng courses

  const handleChangeStatus = () => {
    // Define the handleChangeStatus function to handle status change logic
  };
  const handleViewDetail = () => {
    // Define the handleViewDetail function to handle detail view logic
  };

  return (
    <div className="course-container">
      <ButtonCourse />
      <SearchCourse onSearch={handleSearch} />
      <CourseTable
        courses={courses}
        onChangeStatus={handleChangeStatus}
        onViewDetail={handleViewDetail}
      />
    </div>
  );
};

export default Course;
