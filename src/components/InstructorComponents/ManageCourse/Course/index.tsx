import React from 'react';
import CourseTable from './CourseTable';
import ButtonCourse from './ButtonCourse';
import SearchCourse from './SearchCourse';
// import Course from '../../../components/InstructorComponents/ManageCourse/Course';
const Course = () => {
  return (
    <div className="manage-course-container">
      <h1>Course</h1>
      <div className='mt-4'>
        <ButtonCourse/>
      </div>
      <div className='mt-4'>
        <SearchCourse onSearch={() => {}}/>
      </div>
      <div className='mt-4'>
        <CourseTable/>
      </div>
    </div>
  );
};

export default Course;