import React, { useState } from 'react';
import ButtonCourse from './ButtonCourse';
import SearchCourse from './SearchCourse';
import type { Course } from '../../../../model/Course';
import CourseTable from './CourseTable';

const Course = () => {
  const [courses] = useState<Course[]>([]);

  const handleSearch = () => {
    console.log('Searching for courses...');
  };

  const handleChangeStatus = () => {
    console.log('Changing status for courses...');
  };

  const handleViewDetail = () => {
    console.log('Viewing detail for courses...');
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
